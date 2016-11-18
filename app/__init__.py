from flask import Flask
from flask_admin import Admin
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config.from_object('config')

admin = Admin(app)
db = SQLAlchemy(app)

from app import views, models, admins, security

from security import define_role_admin
arb_role = models.Role.query.get(1)
if arb_role != None:
    define_role_admin()
