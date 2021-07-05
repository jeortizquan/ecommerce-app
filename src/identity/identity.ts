import cuid from 'cuid';
import { v4 as uuidv4 } from 'uuid';

const Id = Object.freeze({
  makeId: cuid,
  makeUUID: uuidv4,
  isValidId: cuid.isCuid,
});

export default Id;
