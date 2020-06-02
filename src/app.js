import Bank from './Bank.js';

const camelCase = function snakeToCamelCase(json) {
    return json.replace(/([-_][a-z])/g, (capturedGroup) => capturedGroup[1].toUpperCase());
}

const toDateObj = function stringToDateObj(key, value) {
    if (key === 'date') return new Date(value);
    return value;
}

const operationsArr = [ ////// FOR DEVELOPING PURPOSES ONLY
    { "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" } },
    { "date": "2016-01-06", "user_id": 2, "user_type": "juridical", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } },
    { "date": "2016-01-06", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 30000, "currency": "EUR" } },
    { "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } },
    { "date": "2016-01-07", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } },
    { "date": "2016-01-10", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 100.00, "currency": "EUR" } },
    { "date": "2016-01-10", "user_id": 2, "user_type": "juridical", "type": "cash_in", "operation": { "amount": 1000000.00, "currency": "EUR" } },
    { "date": "2016-01-10", "user_id": 3, "user_type": "natural", "type": "cash_out", "operation": { "amount": 1000.00, "currency": "EUR" } },
    { "date": "2016-02-15", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } },
] ////// FOR DEVELOPING PURPOSES ONLY

let bankVilniusBranch = new Bank('Vilniaus filialas');

// const operation = JSON.parse(camelCase(JSON.stringify(operationsArr[0])), toDateObj); ////// FOR DEVELOPING PURPOSES ONLY
// bank.processTransaction(operation); ////// FOR DEVELOPING PURPOSES ONLY

for (let i = 0; operationsArr.length > i ; i++) { ////// FOR DEVELOPING PURPOSES ONLY
    bankVilniusBranch.processTransaction(JSON.parse(camelCase(JSON.stringify(operationsArr[i])), toDateObj)); ////// FOR DEVELOPING PURPOSES ONLY
} ////// FOR DEVELOPING PURPOSES ONLY

// bank.transactionsLog.forEach(v => console.log('transactionLog: ', {v})); ////// FOR DEVELOPING PURPOSES ONLY



