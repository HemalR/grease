import { createRxDatabase, addRxPlugin } from 'rxdb'; // RxDatabase
import pouchDbAdapter from 'pouchdb-adapter-idb';
import { RxDBValidatePlugin } from 'rxdb/plugins/validate';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';

import { createLogId } from './id';

addRxPlugin(pouchDbAdapter);
addRxPlugin( RxDBValidatePlugin );
addRxPlugin( RxDBQueryBuilderPlugin );

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

const logsSchema = {
  "title": "logs schema",
  "version": 0,
  "description": "Schema for the logs collection",
  "type": "object",
  "properties": {
    "_id": {
      "type": "string",
      "primary": true
    },
    "exerciseId": {
      "type": "string",
    },
    "qty": {
      "type": "number"
    },
  },
  "required": [ "_id", "exerciseId", "qty" ],
};

async function initDb() {
  try {
    const db = await createRxDatabase( {
      name: 'grease',
      adapter: 'idb',
    } );
    const Exercises = await db.collection( {
      name: 'exercises',
      schema: exercisesSchema,
    } )
    const Logs = await db.collection( {
      name: 'logs',
      schema: logsSchema,
    } )
    return { Exercises, Logs };
  } catch ( err ) {
    throw new Error(err);
  }
};

const createSkeletonLog = (exerciseId ) => ({
    _id: createLogId(),
    exerciseId,
    qty: ''
    })
  
export {initDb, createSkeletonLog}