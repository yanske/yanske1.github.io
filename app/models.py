from app import db
from flask_security import UserMixin, RoleMixin

class Intro(db.Model):
    active = db.Column(db.Boolean(), primary_key = True, unique = True)
    title = db.Column(db.String(64))
    name = db.Column(db.String(64))
    picture_url = db.Column(db.String(120))
    short_description = db.Column(db.String(120))

class Projects(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(64))
    project_icon_url = db.Column(db.String(120))
    description = db.Column(db.String(10000))
    ProjectPics = db.relationship('ProjectPic', backref = 'project', lazy = 'dynamic')

class ProjectPic(db.Model):
    picture_id = db.Column(db.Integer, primary_key = True)
    picture_url = db.Column(db.String(120))
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'))

class About(db.Model):
    active = db.Column(db.Boolean(), primary_key=True, unique=True)
    description = db.Column(db.String(10000))
    location = db.Column(db.String(120))
    copyright_name = db.Column(db.String(24))
    linked_in = db.Column(db.String(64))
    github = db.Column(db.String(64))

#roles_users = db.Table(
 #   'roles_users',
  #  db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
   # db.Column('role_id', db.Integer(), db.ForeignKey('role.id'))
#)

#class User(db.Model, UserMixin):
#    id = db.Column(db.Integer, primary_key = True)
#    name = db.Column(db.String(64), unique = True)
#    password = db.Column(db.String(64))
#    active = db.Column(db.Boolean())
#    email = db.Column(db.String(255), unique=True)
#    roles = db.relationship('Role', secondary = roles_users, backref = db.backref('users', lazy = 'dynamic'))
#    def __str__(self):
#        return self.email

#class Role(db.Model, RoleMixin):
#    id = db.Column(db.Integer(), primary_key=True)
#    name = db.Column(db.String(80), unique=True)
#    description = db.Column(db.String(255))

#    def __str__(self):
#        return self.name