// components/BookForm.js
import React, { useState } from 'react';

export default function BookForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || '');
  const [author, setAuthor] = useState(initialData.author || '');
  const [category, setCategory] = useState(initialData.category || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, author, category });
  };

  
 return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded shadow">
      <h2 className="text-2xl font-bold text-center mb-6 text-indigo-700">
        📘 {initialData.title ? "Edit Buku" : "Tambah Buku Baru"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Judul Buku</label>
          <input
            type="text"
            className="w-full text-gray-600 border border-indigo-900 px-4 py-2 rounded shadow-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Penulis</label>
          <input
            type="text"
            className="w-full text-gray-600 border border-indigo-900 px-4 py-2 rounded shadow-sm"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Kategori</label>
          <input
            type="text"
            className="w-full text-gray-600 border border-indigo-900 px-4 py-2 rounded shadow-sm"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
        >
          Simpan Buku
        </button>
      </form>
    </div>
  );
}
