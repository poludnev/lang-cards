import fs from 'fs/promises';
import { TVocabulary } from 'types';

export default async function handler(req, res) {
  const dataPath = process.env.WORDLIST_PATH;
  if (req.method === 'POST') {
    const data = req.body;
    const sortedIds = data.allIDs.sort((a, b) => a.localeCompare(b));
    fs.writeFile(dataPath, JSON.stringify({ ...data, allIDs: sortedIds }));
    res.status(200).json({ ok: 'ok' });
    return;
  }

  try {
    const words = await fs.readFile(dataPath, 'utf-8');
    const parsedWords: TVocabulary = JSON.parse(words);
    res.status(200).json(parsedWords);
  } catch (error) {
    const data: TVocabulary = { allIDs: [], byId: {} };
    res.status(200).json(data);
  }
}
