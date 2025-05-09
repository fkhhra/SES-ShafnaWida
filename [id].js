import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data); // baca JSON murni
  } catch (err) {
    console.error('Failed to read data:', err);
    return { books: [] };
  }
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8'); // tulis JSON murni
};

export default function handler(req, res) {
  const { id } = req.query;
  const bookId = parseInt(id);

  const data = readData();
  const index = data.books.findIndex(b => b.id === bookId);

  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  if (req.method === 'GET') {
    res.status(200).json(data.books[index]);
  } else if (req.method === 'PUT') {
    const { title, author, category } = req.body;
    data.books[index] = { ...data.books[index], title, author, category };
    writeData(data);
    res.status(200).json(data.books[index]);
  } else if (req.method === 'DELETE') {
    data.books.splice(index, 1);
    writeData(data);
    res.status(200).json({ message: 'Deleted' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
