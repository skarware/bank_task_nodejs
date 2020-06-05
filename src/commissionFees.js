export default (function commissionFees() {

    const commissionFeesConfigURLs = {
        cashIn: "http://private-anon-e3a33b01c6-uzduotis.apiary-mock.com/config/cash-in;",
        cashOutNatural: "http://private-anon-e3a33b01c6-uzduotis.apiary-mock.com/config/cash-out/natural",
        cashOutJuridical: "http://private-anon-e3a33b01c6-uzduotis.apiary-mock.com/config/cash-out/juridical"
    };

    const fetchFeesConfig = function fetchCommissionFeesConfigurationFromAPI(url) {

    }

    const makeFeesConfigObject = async function makeCommissionFeesConfigurationFromAPI(urlsObj) {
        // Create new empty object
        let feeConfigs = {};
        // Populate new empty object with commission fees configs received from API with same names as found in urlsObj parameter
        for (let [key, value] of Object.entries(commissionFeesConfigURLs)) {
            console.log(`${key}: ${value}`);    ////// FOR DEVELOPING PURPOSES ONLY
            // feeConfigs[key] = fetchFeesConfig(value);
        }
        // Object.entries(commissionFeesConfigURLs).forEach(([key, value]) => feeConfigs[key] = fetchFeesConfig(value))

        console.log(feeConfigs);    ////// FOR DEVELOPING PURPOSES ONLY

        // return = await Promise.all(feeConfigs);

        return {  ////// FOR DEVELOPING PURPOSES ONLY
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
        }
    }

    const getFeesConfig = function getCommissionFeesConfigurationFromAPI() {
        // not sure if having this get method makes sense then all the hard work is done by make
        return makeFeesConfigObject(commissionFeesConfigURLs);
    }

    const updateFeesConfig = function updateCommissionFeesConfigurationFromAPI() {
        return getFeesConfig();
        // we should need a return.... if use singelton pattern
    }

    return {
        // getFeesConfig: getFeesConfig(commissionFeesConfigURLs),
        getFeesConfig: getFeesConfig,
        updateFeesConfig: updateFeesConfig,

    }

})()