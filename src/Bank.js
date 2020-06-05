import commissionFees from './commissionFees.js';

// on first load get commission Fees Configuration from API
let commissionFeesConfig = commissionFees.getFeesConfig();

export default class Bank {

    // update config function should be able to update all bank instances configs at oce or?
    // In case commissionFeesConfig changes we can upate it
    updateCommissionFeesConfig() {
       commissionFeesConfig = commissionFees.updateFeesConfig(); // Ca tuo atveju jei butu singeltonas, bet ar tai singeltonas? kolkas ne
    }

    // same log for all branches of the bank
    static transactionsLog = [];

    constructor(branchName) {
        this.branchName = branchName;
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
        let feeConfig = commissionFeesConfig.cashIn; // default
        if (type === 'cashOut') {
            feeConfig = commissionFeesConfig.cashOutNatural
            if (userType === 'juridical') {
                feeConfig = commissionFeesConfig.cashOutJuridical;
            }
        }
        return feeConfig;
    }
}