import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';
import path from 'path';
import { promises as fs } from 'fs';
import getDb from '../util/getDb';
import { Subject } from '../../shared/types/subject';
import { Index } from '../types/index';
import { Record } from '../types/record';
import { Database } from '../types/database';

export const writeToIndex = async (record: Record): Promise<void> => {
  const db = getDb('index');
  await db.get('pages').push(record).write();
};

export const writeSubject = async (
  newSubject: Subject,
  id: string
): Promise<void> => {
  const rootDirectory = path.resolve('public/data/');
  const fileName = `${id}.json`;
  const dbName = path.join(rootDirectory, fileName);
  if (!dbName.startsWith(rootDirectory)) {
    throw new Error('Not valid directory');
  }
  await fs.writeFile(dbName, '');
  const db = getDb(id);
  const database: Database = {
    title: newSubject.title,
    id: newSubject.id,
    data: [],
  };
  await db.defaults(database).write();
  const record: Record = { title: newSubject.title, id: newSubject.id };
  await writeToIndex(record);
};

export const checkIfSubjectExists = async (
  id: string,
  title: string
): Promise<boolean> => {
  const adapter = new FileSync<Index>('public/data/index.json');
  const db = low(adapter);
  const subjectIndex = db
    .get('pages')
    .findIndex((s) => s.id === id || s.title === title)
    .value();
  return subjectIndex !== -1;
};
