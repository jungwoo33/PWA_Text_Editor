// jw, this is related to the lecture#21 ~ #24
// jw, so, our database name is "jate"
import { openDB } from 'idb';
const dbName = 'jate'; // jw, this is the name of the database

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
  const todosDb = await openDB('todos', 1);
  const tx = todosDb.transaction('todos', 'readwrite');
  const store = tx.objectStore('todos');
  const request = store.put({ id: id, todo: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);  
  console.error('putDb not implemented');
};

// TODO: Add logic for a method that gets all the content from the database
// jw, updated from lecture #24
export const getDb = async () => {
  console.log('GET all from the database');
  const todosDb = await openDB('todos', 1);
  const tx = todosDb.transaction('todos', 'readonly');
  const store = tx.objectStore('todos');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result;  
  console.error('getDb not implemented');
};
initdb();
