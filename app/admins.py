from app import admin, db
from .models import Intro, Projects, ProjectPic, User, About
from .security import ModelView

admin.add_view(ModelView(Intro, db.session))
admin.add_view(ModelView(Projects, db.session))
admin.add_view(ModelView(ProjectPic, db.session))
admin.add_view(ModelView(About, db.session))
admin.add_view(ModelView(User, db.session))