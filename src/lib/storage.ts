import { Storage } from '@google-cloud/storage';

const storage = new Storage({
  keyFilename: "C:\\Users\\betsy.nazareno_devsu\\Desktop\\chatug-5cfe95be1efc.json",
});

export const BUCKET_NAME = 'chatug-images';

export const BCK = storage.bucket(BUCKET_NAME);