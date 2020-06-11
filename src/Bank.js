import commissionFees from './commissionFees.js';
import Utils from './Utils.js';

// On first Bank class load get commission Fees Configuration from API
const commissionFeesManager = commissionFees.getInstance();
const commissionFeesConfig = commissionFeesManager.getFeesConfig;

// Same log for all branches of the bank
const transactionsLog = [];

export default class Bank {

    // In case commission fees configuration on API changes and must be update during operations
    static updateCommissionFeesConfig() {
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
        // save transaction to the Bank's log
        transactionsLog.push(transaction);
    }

    getCommissionFee(transaction) {

        // First before anything else get the operation type for given transaction. Available operation types:['cashIn','cashOutNatural','cashOutJuridical']
        const operationType = this.getOperationType(transaction);

        // Get the right commission fee config
        const feeConfig = commissionFeesConfig[operationType];

        console.log("operationType: ", operationType);    ////// FOR DEVELOPING PURPOSES ONLY
        console.log("feeConfig: ", feeConfig);    ////// FOR DEVELOPING PURPOSES ONLY

        // transaction amount is used quite often in this method so useful to assign its value to a well-named const
        const transactionAmount = transaction.operation.amount;
        let commissionFee;
        let taxableAmount;

        // if operation type cashOutNatural
        if (operationType === 'cashOutNatural') {
            // if user exceeded weekly limit amount calc the appropriate commission fee
            const exceededAmount = this.currentWeekWithdrawnAmount(transaction) - feeConfig.weekLimit.amount;
            if (exceededAmount > 0) {
                // commission is calculated only from exceeded amount
                if (exceededAmount < transactionAmount) {
                    // for 1000.00 EUR (weekLimit.amount) there is still no commission fee
                    taxableAmount = transactionAmount - exceededAmount;
                } else {
                    // if (exceededAmount >= transactionAmount) then tax a whole transactionAmount
                    taxableAmount = transactionAmount;
                }

                // when taxable amount is known calc the commission fee
                commissionFee = this.calcCommissionFee(taxableAmount, feeConfig);
            } else {
                // or return 0 commission fee if weekly cash out limit is not exceeded and transaction is free of charge
                return 0;
            }
            // if operation type is NOT cashOutNatural then
        } else {
            // calc preliminary commission fee per transaction
            commissionFee = this.calcCommissionFee(transactionAmount, feeConfig);

            // check if commissionFee is not over the cap or below minimum fee per operation
            if (
                operationType === 'cashOutJuridical'
                && (commissionFee < feeConfig.min.amount)
            ) {
                // Cash out for legal persons commission fee has its minimum fee per operation
                commissionFee = feeConfig.min.amount;
            } else if (
                operationType === 'cashIn'
                && (commissionFee > feeConfig.max.amount)
            ) {
                // Cash in commission fee has its cap
                commissionFee = feeConfig.max.amount;
            }
        }

        console.log("commissionFee: ", commissionFee);    ////// FOR DEVELOPING PURPOSES ONLY

        // Then all is done return commission fee
        return commissionFee;
    }

    currentWeekWithdrawnAmount({userId, date, operation}) {

        return 0;
    }

    calcCommissionFee(taxableAmount, feeConfig) {


        // simply get percents from feeConfig and multiply by the taxable amount and divide by 100
        return feeConfig.percents * taxableAmount / 100;
    }

    getOperationType({type, userType}) {
        // set the default operation type same as passed type
        let operationType = type;

        // if cashOut then concatenate Capitalized userType to specify which userType cashing out
        if (type === 'cashOut') {
            operationType += Utils.capitalize(userType);
        }
        return operationType;
    }

}