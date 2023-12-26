import * as dotenv from 'dotenv';

import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
    port: process.env.PORT,
    databaseUrl: process.env.DB_URL,
    bcrypt_salt_rounds: process.env.SALTROUND,
    ACCESS_SEC_JWT: process.env.JWT_ACCESS_SEC
};
