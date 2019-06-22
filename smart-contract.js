const Web3 = require('web3');

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

let abi = require('../StaaS/build/contracts/TaxStorage').abi,
    address = '0x42D0cC85dF314FE25bBAE130dEEa8A825C4a6d3B',
    async = require("async"),
    contractInstance = new web3.eth.Contract(abi, address);


exports.saveToBlockchain = function (payload, callback) {
    async.eachSeries(payload, (file, cb_each) => {
        async.waterfall([
            (cb) => {
                contractInstance.methods.upload(Date.now(), file.Name, file.Amount, file.Penalties, file.Increases, file.Asset, file.UserId, '0x537C9a6C0ae49e58679e8C2F080BCB0C03721484', '0x537C9a6C0ae49e58679e8C2F080BCB0C03721484')
                    .send({from: '0x537C9a6C0ae49e58679e8C2F080BCB0C03721484', gas: 3000000}, (error, response) => {
                        if (error) {
                            console.error(error)
                        }

                        return cb()
                    });
            },
            (cb) => {
                contractInstance.methods.taxesCount()
                    .call({from: '0x537C9a6C0ae49e58679e8C2F080BCB0C03721484', gas: 3000000}, (error, response) => {
                        if (error) {
                            console.error(error)
                        }
                        console.log("Lenght is: " + (parseInt(response._hex) + 1))
                        return cb(null, parseInt(response._hex))
                    });
            },
            (index, cb) => {
                contractInstance.methods.taxes(index)
                    .call({from: '0x537C9a6C0ae49e58679e8C2F080BCB0C03721484', gas: 3000000}, (error, response) => {
                        if (error) {
                            console.error(error)
                        }
                        console.log(response)
                        cb()
                    });
            }
        ], cb_each);
    }, callback)
};
// saveToBlockchain([{title: "nume1", href: "http://example.com"}], ()=>{
//     console.log('Done')
// })
