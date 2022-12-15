import { useEffect, useState } from 'react';
import { addDocumentById, getAllDocuments, getDocument } from 'utils/firebase';
import { api as apiRoute } from 'routes';
import { TVocabulary } from 'types';

import prodVocabData from 'data/prod/vocabulary.json';
import testVocabData from 'data/vocabulary.json';
import { async } from '@firebase/util';
const Upload = () => {
  const [dataBaseName, setDataBaseName] = useState<string>('');

  const timeStamp = Date.now();

  const uploader = async () => {
    fetch(apiRoute.words())
      .then((res) => res.json())
      .then((data: TVocabulary) => {
        const ids = data.allIDs;
        console.log(ids);
        Promise.all(
          ids.map((id) => addDocumentById('backup' + timeStamp, id, data.byId[id])),
        ).then((result) => {
          console.log(result);
        });
      });
  };

  const downloader = async () => {
    const data = await getAllDocuments(dataBaseName);
    console.log(data);
    const allIDs = Object.keys(data);
    const byId = data;
    // console.log({ allIds, byId });

    fetch(apiRoute.words(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ allIDs, byId }),
    })
      .then((res) => res.json())
      .then(console.log);
  };

  const test1 = async () => {
    addDocumentById('prodCollection', 'prodVocabulary', prodVocabData);
  };

  const test2 = async () => {
    const data = await getDocument('testCollection', 'vocab1');
    console.log(data);
  };

  return (
    <div>
      <button onClick={uploader}>Upload data to db</button>
      <input onChange={(event) => setDataBaseName(event.target.value)} value={dataBaseName} />
      <button onClick={downloader}>Download data</button>
      <button onClick={test1}>Test</button>
      <button onClick={test2}>Test2</button>
    </div>
  );
};

export default Upload;
