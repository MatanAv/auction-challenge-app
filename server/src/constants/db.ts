import config from '@/config';

const MONGO_URI = `${config.db.BASE_URI}/${config.db.URI_PARAMS}` || '';

export { MONGO_URI };
