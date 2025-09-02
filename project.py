from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from src.models.user import db

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    key = db.Column(db.String(50), unique=True, nullable=False)
    project_type = db.Column(db.String(50), nullable=False)  # Software, Core, Service Management
    description = db.Column(db.Text)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date)
    budget = db.Column(db.Float)
    currency = db.Column(db.String(10), default='USD')
    
    # Project lead
    project_lead_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    project_lead = db.relationship('User', backref='led_projects')
    
    # Tool configurations
    jira_project_id = db.Column(db.String(100))
    confluence_space_key = db.Column(db.String(100))
    productive_project_id = db.Column(db.String(100))
    
    # Meeting configurations
    steering_meeting_enabled = db.Column(db.Boolean, default=False)
    steering_meeting_frequency = db.Column(db.String(20))  # Weekly, Bi-weekly, Monthly
    steering_meeting_day = db.Column(db.String(20))
    steering_meeting_time = db.Column(db.Time)
    
    pm_meeting_enabled = db.Column(db.Boolean, default=False)
    pm_meeting_frequency = db.Column(db.String(20))  # Weekly, Bi-weekly
    pm_meeting_day = db.Column(db.String(20))
    pm_meeting_time = db.Column(db.Time)
    
    # Status tracking
    status = db.Column(db.String(50), default='Setup')  # Setup, Active, Completed, Archived
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def __repr__(self):
        return f'<Project {self.name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'key': self.key,
            'project_type': self.project_type,
            'description': self.description,
            'start_date': self.start_date.isoformat() if self.start_date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'budget': self.budget,
            'currency': self.currency,
            'project_lead_id': self.project_lead_id,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class ProjectMember(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    role = db.Column(db.String(100), nullable=False)  # Developer, QA, Designer, etc.
    
    project = db.relationship('Project', backref='members')
    user = db.relationship('User', backref='project_memberships')
    
    def __repr__(self):
        return f'<ProjectMember {self.user_id} in {self.project_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'user_id': self.user_id,
            'role': self.role
        }

class APICredential(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    service = db.Column(db.String(50), nullable=False)  # jira, confluence, productive, outlook
    instance_url = db.Column(db.String(500))
    api_token = db.Column(db.Text, nullable=False)  # Encrypted
    organization_id = db.Column(db.String(100))  # For Productive
    
    user = db.relationship('User', backref='api_credentials')
    
    def __repr__(self):
        return f'<APICredential {self.service} for {self.user_id}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'service': self.service,
            'instance_url': self.instance_url,
            'organization_id': self.organization_id
        }

