import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Booklist() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/books')
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  const deleteBook = async (id) => {
    await fetch(`/api/books/${id}`, {
      method: 'DELETE',
    });
    setBooks(books.filter(b => b.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-extrabold text-indigo-900 text-center mb-6">
          📚 Daftar Buku
        </h1>

        <div className="text-right mb-6">
          <Link
            href="/books/add"
            className="inline-block bg-indigo-800 text-white font-medium px-4 py-2 rounded-lg hover:bg-indigo-900 transition"
          >
            ➕ Tambah Buku
          </Link>
        </div>

        <ul className="space-y-4">
          {books.map((b) => (
            <li
              key={b.id}
              className="bg-gray-50 border border-indigo-200 p-4 rounded-lg shadow-sm flex justify-between items-center hover:shadow-md transition"
            >
              <div>
                <Link
                  href={`/books/${b.id}`}
                  className="text-lg font-semibold text-indigo-800 hover:underline"
                >
                  {b.title}
                </Link>
                <p className="text-sm text-gray-600">oleh {b.author}</p>
              </div>
              <div className="space-x-2">
                <Link
                  href={`/books/${b.id}`}
                  className="bg-indigo-600 text-white px-3 py-1.5 rounded hover:bg-indigo-700 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteBook(b.id)}
                  className="bg-indigo-600 text-white px-3 py-0.5 rounded hover:bg-indigo-700 transition"
                >
                  Hapus
                </button>
              </div>
            </li>
          ))}
        </ul>

        {books.length === 0 && (
          <p className="text-center text-gray-500 italic mt-6">Belum ada buku yang ditambahkan.</p>
        )}
      </div>
    </div>
  );
}
