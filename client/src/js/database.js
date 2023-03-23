// jw, this is related to the lecture#21 ~ #24
// jw, so, our database name is "jate"
import { openDB } from 'idb';
//const dbName = 'jate'; // jw, this is the name of the database

// jw, here, jate is the name of the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// jw, updated from lecture #24
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  //const request = store.put({ id: id, value: content }); // jw, I may need to change this
  const request = store.put({ id: 0, value: content }); // jw, store the initial cache value to #0
  const result = await request;
  result? 
    console.log('🚀 - data saved to the database', result)
  :
    console.error('putDb not implemented');
  
  // console.log('🚀 - data saved to the database', result);  
  //console.error('putDb not implemented');
};

// TODO: Add logic for a method that gets all the content from the database
// jw, updated from lecture #24
export const getDb = async () => {
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  //return result;
  return result?.value;
  //console.error('getDb not implemented');
};
initdb();
