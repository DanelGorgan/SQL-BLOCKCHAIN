const sql = require('mssql')

async () => {
    try {
        // await sql.connect('mssql://username:password@localhost/database');
        await sql.connect('mssql://DGORGAN-L:@localhost/master');
        const result = await sql.query`select * from mytable where id = ${value}`;
        console.dir(result)
    } catch (err) {
        // ... error checks
    }
};