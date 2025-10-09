from app import db, create_app
from app.models import Note
from flask import Blueprint, jsonify, request
from werkzeug.exceptions import BadRequest, NotFound

api = Blueprint('api', __name__)

@api.errorhandler(BadRequest)
def handle_bad_request(e):
    return jsonify(error=str(e)), 400

@api.errorhandler(NotFound)
def handle_not_found(e):
    return jsonify(error=str(e)), 404

@api.route('/notes')
def dx_notes():
    notes = db.session.query(Note).all()
    return jsonify([{
        'id' : note.id,
        'text' : note.text,
        'visibility' : note.visibility
    } for note in notes])

@api.route('/notes/<int:id>')
def get_note(id):
    note = db.session.get(Note, id)  
    
    if note is None:
        raise NotFound('Notes not found')
    
    return jsonify({
        'id' : note.id,
        'text' : note.text,
        'visibility' : note.visibility,
    }), 200

@api.route('/notes', methods=['POST'])
def create_note():
    if not request.json or 'text' not in request.json or 'visibility' not in request.json:
        raise BadRequest('content is required')
    data = request.get_json()
    note = Note(text=data['text'], visibility=data['visibility'])
    
    db.session.add(note)
    db.session.commit()
    
    return jsonify({
        'id' : note.id,
        'text' : note.text,
        'visibility' : note.visibility
    }), 201
    
@api.route('/notes/<int:id>', methods=['PUT'])
def update_note(id):
    data = request.get_json()
    note = db.session.get(Note, id)
    
    if note is None:
        raise NotFound('note not found')
    if not request.json or 'text' not in request.json or 'visibility' not in request.json:
        raise BadRequest('content is required')
    
    
    note.text = data['text']
    note.visibility = data['visibility']
    
    db.session.commit()
    
    return jsonify({
        'id':id,
        'text':note.text,
        'visibility':note.visibility
    }), 200
    
@api.route('/notes/<id>', methods=['DELETE'])
def delete_note(id):
    note = db.session.get(Note, id)
    
    if note is None:
        raise NotFound('note not found')
    
    db.session.delete(note)
    db.session.commit()
    
    return jsonify({'result': True})

if __name__ == '__main__':
    api.run(debug=True)