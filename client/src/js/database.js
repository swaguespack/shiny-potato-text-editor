import { openDB } from 'idb';

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

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  // Connect to database
  const jateDb = await openDB('jate',1);

  // Create transaction & set database and privileges
  const tx = jateDb.transaction('jate','readwrite');

  // Open object store
  const store = tx.objectStore('jate');

  // Pass in content to store using .add() method
  const request = store.put({ id: 1, value: content });

  // Confirmation of request
  const result = await request;

  console.log('Data saved to database', result);
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {

  // Connect to database
  const jateDb = await openDB('jate', 1);

  // Create transaction & set database and privileges
  const tx = jateDb.transaction('jate','readonly');

  // Open object store
  const store = tx.objectStore('jate');

  // Get all content using .get method
  const request = store.get(1);

   // Confirmation of request
  const result = await request;
  result
  ? console.log('Data retrieved from database')
  : console.log('Data not in databse');

  return result?.value;
};

initdb();
