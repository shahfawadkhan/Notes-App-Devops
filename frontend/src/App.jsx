import { useState, useEffect } from 'react';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL || '/api/notes';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get(API);
      setNotes(data);
    } catch {
      setError('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNotes(); }, []);

  const addNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    try {
      const { data } = await axios.post(API, { title, content });
      setNotes([data, ...notes]);
      setTitle('');
      setContent('');
    } catch {
      setError('Failed to add note');
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      setNotes(notes.filter(n => n._id !== id));
    } catch {
      setError('Failed to delete note');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold text-yellow-400">📝 Notes App</h1>
        <p className="text-gray-400 text-sm mt-1">DEVOPS -- PRACTICE **Changes For cd**</p>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <form onSubmit={addNote} className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-200 mb-4">Add a Note</h2>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 mb-3 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={3}
            className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 mb-4 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400 resize-none"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold py-2 rounded-lg transition-colors"
          >
            + Add Note
          </button>
        </form>

        {error && (
          <div className="bg-red-900/40 border border-red-600 text-red-300 px-4 py-3 rounded-lg mb-6">
            {error} <button onClick={() => setError('')} className="ml-2 underline">dismiss</button>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-500">Loading notes...</p>
        ) : notes.length === 0 ? (
          <div className="text-center py-16 text-gray-600">
            <p className="text-5xl mb-3">📭</p>
            <p>No notes yet. Add one above!</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">{notes.length} note{notes.length !== 1 ? 's' : ''}</p>
            {notes.map(note => (
              <div
                key={note._id}
                className="bg-gray-900 border border-gray-700 rounded-xl p-5 flex justify-between items-start group hover:border-gray-500 transition-colors"
              >
                <div className="flex-1 mr-4">
                  <h3 className="font-semibold text-white mb-1">{note.title}</h3>
                  <p className="text-gray-400 text-sm whitespace-pre-wrap">{note.content}</p>
                  <p className="text-gray-600 text-xs mt-3">
                    {new Date(note.createdAt).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="text-gray-600 hover:text-red-400 transition-colors text-xl leading-none flex-shrink-0 opacity-0 group-hover:opacity-100"
                  title="Delete note"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
