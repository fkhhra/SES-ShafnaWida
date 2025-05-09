import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data.json');

const readData = () => {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Gagal membaca data:", error);
    return { books: [] };
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Gagal menulis data:", error);
  }
};

export default function handler(req, res) {
  if (req.method === 'GET') {
    const data = readData();
    res.status(200).json(data.books);
  } else if (req.method === 'POST') {
    const { title, author, category } = req.body;
    if (!title || !author || !category) {
      return res.status(400).json({ error: "Semua field wajib diisi" });
    }

    const data = readData();
    const newBook = {
      id: Date.now(),
      title,
      author,
      category
    };

    data.books.push(newBook);
    writeData(data);
    res.status(201).json(newBook);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
