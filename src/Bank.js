import commissionFees from './commissionFees.js';
import Utils from './Utils.js';

// On first Bank class load get commission Fees Configuration from API
const commissionFeesManager = commissionFees.getInstance();
let commissionFeesConfig = commissionFeesManager.getFeesConfig;

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
        /**
         * To get commission fee for a transaction getCommissionFee(transaction) method must be invoked,
         * but first it needs to get data from network services (commissions fees configuration from API).
         * So we could create function getCommissionFeesConfig(callbackGetCommissionFee, self) {...}
         * and on invocation pass getCommissionFeesConfig(this.getCommissionFee.bind(this), this) as call back;
         * Basically: getData(callback);
         * Or we can wrap this.getCommissionFee(transaction) invocation into an anonymous async function (IIFE)
         * this helps to avoid losing 'this' context when passing object methods as callbacks.
         */
        (async () => {
            // wait for network data returned then reassign resolved Promise value
            commissionFeesConfig = await commissionFeesConfig;

            // get commission fee for given transaction after we received commissionFeesConfig
            const commissionFee = this.getCommissionFee(transaction);

            // print commission fee to stdout
            console.log(commissionFee);

            // after we done processing transaction add it to the log for the future reference
            this.logTransaction(transaction);
        })();
    }

    logTransaction(transaction) {
        // save transaction to the Bank's class log
        transactionsLog.push(transaction);
    }

    getCommissionFee(transaction) {
        /**
         * First before anything else get the operation type for given transaction.
         * Available operation types at current time but might change:
         * ['cashIn', 'cashOutNatural', 'cashOutJuridical']
         */
        const operationType = this.getOperationType(transaction);

        // Get the right commission fee config
        const feeConfig = commissionFeesConfig[operationType];

        // transaction amount is used quite often in this method so useful to assign its value to a well-named const
        const transactionAmount = transaction.operation.amount;
        let commissionFee;
        let taxableAmount;

        // if operation type cashOutNatural
        if (operationType === 'cashOutNatural') {
            // get user's exceeded weekly withdrawn limit amount since last Monday
            const exceededAmount = this.getCurrentWeekWithdrawnAmount(transaction) - feeConfig.weekLimit.amount;

            // if user exceeded weekly limit calc the appropriate commission fee
            if (exceededAmount > 0) {
                // commission is calculated only from exceeded amount
                if (exceededAmount < transactionAmount) {
                    // ! for 1000.00 EUR (weekLimit.amount) there is still no commission fee only to the part over it
                    taxableAmount = exceededAmount;
                } else {
                    // if (exceededAmount >= transactionAmount) then tax a whole transactionAmount
                    taxableAmount = transactionAmount;
                }
            } else {
                // ese if weekly cash out limit is not exceeded then transaction is free of charge
                taxableAmount = 0;
            }

            // when the taxable amount is known calc the commission fee
            commissionFee = this.calcCommissionFee(taxableAmount, feeConfig);

            // else operation type is NOT cashOutNatural then
        } else {
            // calc preliminary commission fee per transaction
            commissionFee = this.calcCommissionFee(transactionAmount, feeConfig);

            // check if commissionFee is not over the cap or below minimum fee per operation
            if (operationType === 'cashOutJuridical' && commissionFee < feeConfig.min.amount) {
                // Cash out for legal persons commission fee has its minimum fee per operation
                commissionFee = this.ceilFixedPoint(feeConfig.min.amount);
            } else if (operationType === 'cashIn' && commissionFee > feeConfig.max.amount) {
                // Cash in commission fee has its cap
                commissionFee = this.ceilFixedPoint(feeConfig.max.amount);
            }
        }

        // // When all is done return commission fee
        return commissionFee;
    }

    getLastMondayDate(date) {
        // getDay() - Gets the day of week, from 0 (Sunday) to 6 (Saturday).
        let dayOfWeek = date.getDay();

        // if weekday 0 (Sunday) set dayOfWeek to 7 to make week starting from 1 (Monday) to 7 (Sunday) therefor calc simpler
        if (dayOfWeek === 0) dayOfWeek = 7;

        const msPerDay = 86400 * 1000;
        const msSinceLastMonday = msPerDay * dayOfWeek - msPerDay;

        // calc the last Monday date in ms and return
        return date.getTime() - msSinceLastMonday;
    }

    getCurrentWeekWithdrawnAmount({userId, date, operation}) {
        // set the current operation's amount as first component of sum of withdrawn amount since last Monday
        let withdrawnSum = operation.amount;

        // get last Monday's date in ms
        const lastMondayDate = this.getLastMondayDate(date);

        // Filter all cashOut transactions by given userId in transactionsLog and if not later then lastMondayDate sum it to withdrawnSum
        transactionsLog
            .filter((logEntry) => (
                logEntry.userId === userId
                && logEntry.type === 'cashOut'
                && logEntry.date.getTime() >= lastMondayDate
            ))
            .forEach((logEntry) => {
                withdrawnSum += logEntry.operation.amount;
            });

        // NOTE: chaining filter and forEach is not the fastest approach but easy readable

        return withdrawnSum;
    }

    calcCommissionFee(taxableAmount, feeConfig) {
        // simply get percents provided in feeConfig multiply by the taxable amount and divide by 100
        let commissionFee = feeConfig.percents * taxableAmount / 100;

        // rounded to the smallest currency item (for example, for EUR currency - cents) to upper bound.
        commissionFee = this.ceilFixedPoint(commissionFee);

        return commissionFee;
    }

    ceilFixedPoint(commissionFee) {
        // ceil commission fee
        commissionFee = Math.ceil(commissionFee * 100) / 100;

        // ensure that commission fee has 2 digits after the decimal point
        return commissionFee.toFixed(2);
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