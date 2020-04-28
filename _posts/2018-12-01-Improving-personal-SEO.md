---
layout: post
title: Improving personal SEO
date: December 01, 2018
---

With the introduction of mobile-first indexing from Google, I began doing some search engine optimization (SEO) work at work, and that got me thinking -- how does my personal website fare?

And it turns out, not so well!
{% include figure.html link="blog/surprised.png" alt="my favourite meme" %}

When I searched a few keywords, such as my name, my name + my school, and so on, my site was not on even within the top 10 pages of results on Google! That's when I decided to try to improve this site's SEO.

### Keeping Score
In order to determine whether my changes are beneficial, I need to define success metrics. In this case, we'll measure success by any improvement in the "Average Position" score in Google's search console.

{% include figure.html link="blog/metric.png" alt="Google search console metric" %}

To set up the metric, I first registered the site on Google's search console and queried a series of keywords on Google that I'll be trying to improve. While it's difficult to control how often exactly each term will be queried, this gives us a good idea of relatively where the site is at in the search results. Initially, our average position is ~209.

### Improvements

#### Page Performance & Mobile Performance
The most straightforward thing to do is to improve the site's performance. However, since this is a static site without a lot of assets (CSS, JS, Images), the page load performance is already very strong. Without complicated layouts, it also behaves fine on mobile.

Regardless, Chrome's Lighthouse Auditing picked up a few places that can be improved on. I removed blocking Javascript files, compressed image assets using [Jekyll-Compress-Images](https://github.com/valerijaspasojevic/jekyll-compress-images "Jekyll Compress Images"), and fixed a few best practices mishaps. In the end, Lighthouse was happy.

{% include figure.html link="blog/lighthouse.png" alt="lighthouse auditing" %}

#### Content
The main improvement came from content. Third party SEO auditing sites pointed out a few issues, such as lack of alt texts for images, which crawlers look for. In addition, I began shuffling around keywords that currently exist on the site -- using them more often in the site, styling them in <H1> tags, and placing them in the site's metadata description.

#### Automation
Lastly, I set up a sitemap and robots text [generator](https://github.com/jekyll/jekyll-sitemap "Jekyll Sitemap"), and submitted the endpoint to Google's search console. In addition, I added TravisCI to catch any images without alt texts.

### Results & Take Aways
After implementing all the changes, I checked back on Google's search console and saw that the current average position is ~20! This is definitely a pleasantly surprising result, as the little work I put in to speed up the page and shuffle content around yielded a 90% increase in page placement.

Looking around at sites that perform better, there are still things that can be done to improve the SEO of this site. For example, those sites are often linked to by various other sites, and they also often have keywords within its domain name. But overall, I'm happy with the results, and it was interesting to see how a series of little improvements can affect the outcomes!
