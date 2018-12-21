import * as dotenv from 'dotenv';

let path;
dotenv.config();
switch (process.env.NODE_ENV) {
  case 'test':
    path = process.env.TEST_DIR;
    break;
  case 'production':
    path = process.env.PROD_DIR;
    break;
  default:
    path = process.env.DEV_DIR;
}
console.log(path);
export const STORE_DIR = path;
