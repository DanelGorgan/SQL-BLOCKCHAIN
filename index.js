const sql = require('mssql');

const config = {
    user: '...',
    password: '...',
    server: 'localhost',
    database: 'master',

};

async () => {
    try {
        // await sql.connect('mssql://username:password@localhost/database');
        await sql.connect(config);
        const result = await sql.query`select * from mytable`;
        console.dir(result)
    } catch (err) {
        console.error(err)
    }
};