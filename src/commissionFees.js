import Utils from './Utils.js';
import fetch from 'node-fetch';

export default (function commissionFeesSingletonFactory() {
    /**
     * Export commissions fees module as singleton, not that the current app version need it but
     * more like to show off or try singleton implementation using lazy initialization pattern in JS
     */
    function commissionFees() {

        // Object with links to currently known commission fees configuration
        const configUrls = {
            cashIn: "http://private-anon-e3a33b01c6-uzduotis.apiary-mock.com/config/cash-in",
            cashOutNatural: "http://private-anon-e3a33b01c6-uzduotis.apiary-mock.com/config/cash-out/natural",
            cashOutJuridical: "http://private-anon-e3a33b01c6-uzduotis.apiary-mock.com/config/cash-out/juridical"
        };

        /**
         * Empty commissions fees config object will be filled up by invoking getFeesConfig;
         * defined as const so that referenced object shall not be change, it is a singleton after all.
         */
        const feesConfig = {};

        const getFeesConfig = async function getCommissionFeesConfigurationFromAPI() {
            // iterate through configUrls and fetch commission fees configuration from API
            for (const [key, value] of Object.entries(configUrls)) {
                /**
                 * if response has status 200 read the response body and return as text;
                 * otherwise if a fetch fails or the response has non-200 status then exit the program.
                 */
                const text = await fetch(value).then(
                    response => {
                        if (response.status !== 200) {
                            console.error("Response status is not 200 while fetching commission fees configuration from API:", response)
                            process.exit();
                        } else {
                            return response.text();
                        }
                    },
                    error => {
                        console.error("Error received while fetching commission fees configuration from API:", error)
                        process.exit();
                    }
                );
                /**
                 * if fetch was successful, take returned text, convert it to Camel Case, and parse as JSON string to an object;
                 * and add/replace parsed JSON as new value to feesConfig object to a given key respectively.
                 */
                feesConfig[key] = JSON.parse(Utils.camelCase(text));
            }

            return feesConfig;
        }

        // method to updates commission fees configuration, at the moment it just returns getFeesConfig()
        const updateFeesConfig = async function updateCommissionFeesConfigurationFromAPI() {
            return getFeesConfig();
        }

        // Return public interface by making a closure to separate public and private module members.
        return {
            // private members are accessible here but not on returned obj (public interface)
            updateFeesConfig: updateFeesConfig,
            getFeesConfig: getFeesConfig,
        }
    }

    let instance;
    return {
        // Singleton's Gatekeeper - returns the one and only instance of the commissionFees object
        getInstance: () => {
            // check if instance is available if not then and only then create it
            if (!instance) {
                instance = new commissionFees();
                /**
                 * null the constructor so the returned object can't be new'd.
                 * NOTE: that delete instance.constructor; won't do the job!
                 */
                instance.constructor = null;
            }
            return instance;
        }
    };
})();