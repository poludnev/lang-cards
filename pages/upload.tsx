import { useEffect, useState } from 'react';
import { addDocumentById, getAllDocuments } from 'utils/firebase';
import { api as apiRoute } from 'routes';
import { TVocabulary } from 'types';
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

  return (
    <div>
      <button onClick={uploader}>Upload data to db</button>
      <input onChange={(event) => setDataBaseName(event.target.value)} value={dataBaseName} />
      <button onClick={downloader}>Download data</button>
    </div>
  );
};

export default Upload;
