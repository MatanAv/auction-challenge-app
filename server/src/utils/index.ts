import { Schema } from 'mongoose';

const getCollectionFieldsFromSchema = (schema: Schema) => {
  return Object.keys(schema.obj);
};

export { getCollectionFieldsFromSchema };
