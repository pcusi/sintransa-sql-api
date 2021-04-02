const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    server: process.env.DB_HOST,
    options: {
        encrypt: true,
        enableArithAbort: true
    }
};

module.exports = config;
