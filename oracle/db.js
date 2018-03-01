var contractData, contractList;
const fs = require('fs');
const dataFilePath = "./data.json";

function load() {
    try {
        contractList = JSON.parse(fs.readFileSync(dataFilePath));
    }
    catch (e) {
        contractList = [];
    }
    
    return contractList;
}
exports.load = load;

function insert(contractData) {
    contractList.push(contractData);
    save();
}
exports.insert = insert;

function save() {
    fs.writeFileSync(dataFilePath, JSON.stringify(contractList));
}

load();


