export default class Bank {

    // create separate module for commission fees configuration?
    static commissionFeesConfigURLs = {
        cashIn: "http://private-anon-e3a33b01c6-uzduotis.apiary-mock.com/config/cash-in;",
        cashOutNatural: "http://private-anon-e3a33b01c6-uzduotis.apiary-mock.com/config/cash-out/natural",
        cashOutJuridical: "http://private-anon-e3a33b01c6-uzduotis.apiary-mock.com/config/cash-out/juridical"
    };

    static getFeesConfig = function getCommissionFeesConfigurationFromAPI() {

        // invoke on object instantiation with constructor or static bock?

    }

    static commissionFeesConfigs = {
        cashIn: {
            "percents": 0.03,
            "max": {
                "amount": 5,
                "currency": "EUR"
            }
        },
        cashOutNatural: {
            "percents": 0.3,
            "week_limit": {
                "amount": 1000,
                "currency": "EUR"
            }
        },
        cashOutJuridical: {
            "percents": 0.3,
            "min": {
                "amount": 0.5,
                "currency": "EUR"
            }
        }
    };

    // same log for all branches of the bank
    static transactionsLog = [];

    constructor(name) {
        this.name = name;
    }

    processTransaction(transaction) {
        console.info('processTransaction(transaction): ', transaction); ////// FOR DEVELOPING PURPOSES ONLY

        // get commission fee for given transaction
        const commissionFee = this.getCommissionFee(transaction);

        // print commission fee to stdout
        console.log(commissionFee)

        // after we done processing transaction add it to the log for the future reference
        this.logTransaction(transaction);
    }

    logTransaction(transaction) {
        Bank.transactionsLog.push(transaction)
    }


    getCommissionFee(transaction) {
        // initial commissionFee
        let commissionFee = 0;

        // First get the right commission fee config for given transaction
        const feeConfig = this.getFeeConfig(transaction);


        return undefined;
    }

    calcCommissionFee(transaction) {


        return undefined;
    }

    getFeeConfig({type, userType}) {
        // fee types 'cashIn','cashOutNatural','cashOutJuridical'
        let feeConfig = Bank.commissionFeesConfigs.cashIn; // default
        if (type === 'cashOut') {
            feeConfig = Bank.commissionFeesConfigs.cashOutNatural
            if (userType === 'juridical') {
                feeConfig = Bank.commissionFeesConfigs.cashOutJuridical;
            }
        }
        return feeConfig;
    }
}