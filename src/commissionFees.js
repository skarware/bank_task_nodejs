import Utils from './Utils.js';

export default (function commissionFeesSingletonFactory() {
    /**
     * Export commissions fees module as singleton, not that the current app version need it but
     * more like to show off or try singleton implementation using lazy initialization pattern in JS
     */
    function commissionFees() {

        // Object with all currently know commission fees configs
        const configUrls = {
            cashIn: "http://private-anon-e3a33b01c6-uzduotis.apiary-mock.com/config/cash-in",
            cashOutNatural: "http://private-anon-e3a33b01c6-uzduotis.apiary-mock.com/config/cash-out/natural",
            cashOutJuridical: "http://private-anon-e3a33b01c6-uzduotis.apiary-mock.com/config/cash-out/juridical"
        };

        const fetchFeesConfig = function fetchCommissionFeesConfigurationFromAPI(url) {

            // maybe should implement plural version, faster async version with Promise.all()

            // Utils.camelCase(JSON.received.from.API);


            // return = await Promise.all(feeConfigs);

        }

        /**
         * Empty commissions fees config object which will be filled by getFeesConfig;
         * const so that referenced obj do not change and updateFeesConfig method would update existing object correctly.
         */
        const feesConfig = {};

        // const getFeesConfig = async function getCommissionFeesConfigurationFromAPI() {
        const getFeesConfig = function getCommissionFeesConfigurationFromAPI() {

            // In case invoked by updateFeesConfig method first deep clean up of existing properties of feesConfig object
            // Object.keys(feesConfig).forEach((key) => {
            //     delete feesConfig[key]
            // });

            // Populate feeConfigs object with commission fees configs received from API with same names as found in configUrls parameter
            // for (const [key, value] of Object.entries(configUrls)) {
            //     console.log(`${key}: ${value}`);    ////// FOR DEVELOPING PURPOSES ONLY
            //     feesConfig[key] = await fetchFeesConfig(value);
            // }
            // This version allowed if no await used inside forEach function
            // Object.entries(configUrls).forEach(([key, value]) => {
            //     console.log(`${key}: ${value}`);    ////// FOR DEVELOPING PURPOSES ONLY
            //     feesConfig[key] = fetchFeesConfig(value);
            // });

             console.log(feesConfig);    ////// FOR DEVELOPING PURPOSES ONLY

            /**
             * Do not return anything here as method will directly change feesConfig variable
             */
        }

        // Updates a single instance object of commission fees configuration just in case those changes
        const updateFeesConfig = function updateCommissionFeesConfigurationFromAPI() {
            // Invoke again getFeesConfig method to update feesConfig variable
            getFeesConfig();
        }

        // Return public interface by making a closure to separate public and private module members.
        return {
            // private members are accessible here but not on returned obj (public interface)
            updateFeesConfig: updateFeesConfig,
            getFeesConfig: feesConfig,
        }
    }

    let instance;
    return {
        // Singleton's Gatekeeper - returns the one and only instance of the commissionFees object
        getInstance: () => {
            // check if instance is available if not then and only then create it
            if (!instance) {
                instance = new commissionFees();

                // fetch on initialization fees configuration from API
                instance.updateFeesConfig();
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