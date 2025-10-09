import unittest
from app import create_app, db
from app.models import Note


class ViewsTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.app_context = self.app.app_context()
        self.app_context.push()
        db.create_all()
        self.client = self.app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        self.app_context.pop()

    def test_create_note(self):
        data = {'text': 'hello world', 'visibility': True}
        response = self.client.post('/notes', json=data)
        self.assertEqual(response.status_code, 201)
        self.assertIn('id', response.json)
        self.assertIn('text', response.json)
        self.assertIn('visibility', response.json)

    def test_get_note(self):
        note = Note(text='hello world')
        db.session.add(note)
        db.session.commit()
        response = self.client.get('/notes/{}'.format(note.id))
        self.assertEqual(response.status_code, 200)
        self.assertIn('id', response.json)
        self.assertIn('text', response.json)

    def test_get_all_notes(self):
        note1 = Note(text='hello world')
        note2 = Note(text='goodbye world')
        db.session.add_all([note1, note2])
        db.session.commit()
        response = self.client.get('/notes')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)
        self.assertEqual(len(response.json), 2)

    def test_update_note(self):
        note = Note(text='hello world', visibility=True)
        db.session.add(note)
        db.session.commit()
        data = {'text': 'updated text', 'visibility': False}
        response = self.client.put('/notes/{}'.format(note.id), json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('id', response.json)
        self.assertIn('text', response.json)
        self.assertIn('visibility', response.json)
        self.assertEqual(response.json['text'], 'updated text')

    def test_delete_note(self):
        note = Note(text='hello world')
        db.session.add(note)
        db.session.commit()
        response = self.client.delete('/notes/{}'.format(note.id))
        self.assertEqual(response.status_code, 200)
        self.assertIn('result', response.json)
        self.assertEqual(response.json['result'], True)