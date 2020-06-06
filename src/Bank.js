import commissionFees from './commissionFees.js';

// On first Bank class load get commission Fees Configuration from API
const commissionFeesManager = commissionFees.getInstance();
const commissionFeesConfig = commissionFeesManager.getFeesConfig;

// Same log for all branches of the bank
const transactionsLog = [];

export default class Bank {

    // In case commission fees configuration on API changes
    updateCommissionFeesConfig() {
        commissionFeesManager.updateFeesConfig();
    }

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
        transactionsLog.push(transaction)
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
        // Available fee types 'cashIn','cashOutNatural','cashOutJuridical'
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