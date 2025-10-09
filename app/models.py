from datetime import datetime
from app import db

class Note(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    visibility = db.Column(db.Boolean, nullable=False, default=True) 
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    
    def __repr__(self) -> str:
        return '<Note {}>'.format(self.id)