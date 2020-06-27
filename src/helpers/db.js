import { createRxDatabase, addRxPlugin } from 'rxdb'; // RxDatabase
import pouchDbAdapter from 'pouchdb-adapter-idb';
import { RxDBValidatePlugin } from 'rxdb/plugins/validate';

addRxPlugin(pouchDbAdapter);
addRxPlugin( RxDBValidatePlugin );

const exercisesSchema = {
  "title": "exercises schema",
  "version": 0,
  "description": "Schema for the exercises collection",
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
      "primary": true
    },
    "name": {
      "type": "string",
    },
    "units": {
      "type": "string"
    },
  },
  "required": [ "name", "units", "_id" ],
};

async function initDb() {
  try {
    const db = await createRxDatabase( {
      name: 'grease', // <- name
      adapter: 'idb', // <- storage-adapter
    } );
    const Exercises = await db.collection( {
      name: 'exercises',
      schema: exercisesSchema,
    } )
    return { Exercises };
  } catch ( err ) {
    throw new Error(err);
  }
};
  
export {initDb}