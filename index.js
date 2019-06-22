const sql = require('mssql/msnodesqlv8');
const config = {
    driver: 'msnodesqlv8',
    connectionString: 'Driver={SQL Server Native Client 11.0};Server={DGORGAN-L};Database={City_Hall};Trusted_Connection={yes};',
};

const saveToBlockchain = require('./smart-contract').saveToBlockchain;

sql.connect(config)
    .then(async function () {
        const result = await sql.query`select * from Taxes_Payments`;
        saveToBlockchain(result.recordset, (err, res) => {
            console.log('DONE!');
            process.exit(0);
        });
    })
    .catch(function (err) {
        console.log(err)
    });
