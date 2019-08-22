---
layout: post
title: Federating Your Go GraphQL Services
date: August 09, 2019
---

During my internship at Khan, I was looking into schema stitching solutions for
our new Go services, when Apollo released their solution --
[Apollo Federation](https://blog.apollographql.com/apollo-federation-f260cf525d21 "Apollo Federation").

Federation is an architecture for resolving and merging remote GraphQL schemas,
and you can use it as a GraphQL gateway for your services to support a
separation of concerns and query hinting (e.g. directives such
as `@provides` / `@requires`).

While it's simple to set up a series of "Federated" services in JavaScript
using Apollo's libraries, there hasn't been a lot of examples on how to
implement support for a Federation gateway in services written in other
languages (AFAIK)! So this post will be an exercise on implementing support
for Federation in Golang services, using the GraphQL server library,
[Gqlgen](https://github.com/99designs/gqlgen "Gqlgen").

### What We Need

To support Federation, there are two main things we need:

1. Ensure that the service can stand alone, i.e. the service's GraphQL schema
should be valid even without the gateway. Firstly, we need to define all of
Federation's directives, as well as create any stub types as need (more on that
in the example below).

2. Implementing the Federation queries, as well as defining custom scalars and
models to support it.


### Running It With Gqlgen

For this example, we'll be using Go with Gqlgen, but the concept is the same
for any other language / GraphQL server library -- in fact, it'll be easier
with a non-type strict language (such as Python)!


#### Federated Schemas

For this example, let us have two services, one that contains information on
users, and another that contains the progress each of these users is making in
math. Respectively, their remote schema will look like (excuse the weird syntax
highlighting, some of these symbols are not recognized yet 🙃):

{% highlight graphql linenos %}
extend type Query {
  currentUser: User
}

type User @key(fields: "id") {
  id: Int!
  username: String!
}
{% endhighlight %}

and

{% highlight graphql linenos %}
type Progress {
  userId: Int!
  percent: Float!
}

extend type User @key(fields: "id") {
  id: Int! @external
  progressInMath: Progress!
}
{% endhighlight %}

The first part involves ensuring the service can stand alone. This means
adding the following Federation directives to the schemas:

{% highlight graphql linenos %}
scalar _FieldSet
directive @external on FIELD_DEFINITION
directive @requires(fields: _FieldSet!) on FIELD_DEFINITION
directive @provides(fields: _FieldSet!) on FIELD_DEFINITION
directive @key(fields: _FieldSet!) on OBJECT
{% endhighlight %}

Also, notice that in the progress service, we extend the User object, but we
have no declaration of it anywhere. So we also define a stub for the User,
like so:

{% highlight graphql linenos %}
type User @key(fields: "id")
{% endhighlight %}

We also need to do this for the Query object, and that brings us to
implementing the Federation specific queries. For each service, we need to
define the stub Query type, as well as support two queries, `_entities` and
`_service`.

{% highlight graphql linenos %}
scalar _Any

type _Service {
  sdl: String
}

type Query {
  _entities(representations: [_Any!]!): [_Entity]!
  _service: _Service!
}
{% endhighlight %}

`_Entity`, as mentioned in the Federation specs, is a union of all types with
the `@key` directive.  In the case of both services, we need to add:

{% highlight graphql linenos %}
union _Entity = User
{% endhighlight %}

The `@key` directive allows us to uniquely identify an object with the field.
This allows Federation to resolve remote nodes by querying `_Entity` and
passing in a type, the key field, and a query fragment of what data we want to
the service that owns that node.

The `_Service` query simply returns the original remote schema declared as a
string.

#### Codegen

Now that we have the schema down, let's generate what's needed for our GraphQL
server! Following the Gqlgen docs, we need to declare a YAML file, and
run `go run github.com/99designs/gqlgen`.

One specific change we need to make to the config is to declare a custom
scalar, `_Any`, which is the argument passed into the `_Entity` query. In Go,
this is simply a `map[string]interface{}` that will only be unmarshalled from 
requests.

In the YAML, add:

{% highlight yaml linenos %}
models:
  _Any:
    model: github.com/user/repo/pkg/graphql.Any
{% endhighlight %}

And at the specified package / class, define the scalar:

{% highlight go linenos %}
type Any map[string]interface{}

func (a *Any) UnmarshalGQL(v interface{}) error {
	parsed, ok := v.(map[string]interface{})
	if !ok {
		return fmt.Errorf("Unexpected representations!")
	}

	*a = parsed
	return nil
}

func (a Any) MarshalGQL(w io.Writer) {
	panic("Not implemented.")
}
{% endhighlight %}

Another model that we'll want to override is `_Entity`. When Gqlgen does its
codegen, it creates an `_Entity` interface, but we'd much rather use one that
we can customize -- in particular, we want all entity objects to be able to
resolve themselves using a `FromKey` function that takes in an `_Any` as
its argument.

Now, our YAML will contain:

{% highlight yaml linenos %}
models:
  _Any:
    model: github.com/user/repo/pkg/graphql.Any
  _Entity:
    model: github.com/user/repo/pkg/graphql.Entity
{% endhighlight %}

And our custom `Entity` interface may look like this:

{% highlight go linenos %}
type Entity interface {
	Is_Entity()
	FromKey(representation Any) error
}
{% endhighlight %}

Okay okay, now we can finally run our codegen command!

#### Implementation

If specified, Gqlgen will create a stub resolver file for you. We'll be
working off that in this example. Let's first go ahead and fill in the
`_Service` resolver. I like to keep the original remote schema in its own
file, and have all the Federation definition / stubs in another.

Then, we can do something like this for the resolver:

{% highlight go linenos %}
func (r *queryResolver) _service(ctx context.Context) (*_Service, error) {
	sdl, err := ioutil.ReadFile(path)
	if err != nil {
		return "", err
	}

	return &_Service{&string(sdl)}, nil
}
{% endhighlight %}

Now let's work on the `_Entity` resolver. In our example,
if we were to make a query like:

{% highlight graphql linenos %}
query {
    currentUser {
        progressInMath  {
            percent
        }
    }
}
{% endhighlight %}

The gateway would first fetch the user object for the user service, and using
the user's key, resolve the user's progress in math by making this `_Entity`
query.

{% highlight graphql linenos %}
query {
    _Entity(representation: [{__typename: "User", id: 1}]) {
        ... on User {
            progressInMath {
                percent
            }
        }
    }
}
{% endhighlight %}

It's the entity resolver's job to resolve objects owned by the service from
this query. Since we previously added a `FromKey` function to the entity
interface, we can use this to delegate resolving every object. Then, our entity
resolver may look like this:

{% highlight go linenos %}
func (r *queryResolver) _entities(ctx context.Context, representations []graphql.Any) ([]graphql.Entity, error) {
	var entities []graphql.Entity

	// We can also do this concurrently.
	for _, rep := range representations {
		typename, ok := rep["__typename"].(string)
		if !ok {
			return nil, fmt.Errorf("Failed to parse rep type.")
		}

		var entity graphql.Entity

		switch typename {
		case "User":
			entity = &User{}
		default:
			return nil, fmt.Errorf("Unexpected rep type.")
		}

		err := entity.FromKey(rep)
		if err != nil {
			return nil, err
		}

		entities = append(entities, entity)
	}

	return entities, nil
}
{% endhighlight %}

where the user model would implement its own `FromKey` function, that is
responsible for returing a partial user object with its progress in math.

Annnd that's it! A lot of this code will be simplified if we used a non-type
strict language, especially in the entity resolver where we can get rid of the
switch statement. Hopefully this example can be helpful to anyone who wants to
try out this new architecture :)
