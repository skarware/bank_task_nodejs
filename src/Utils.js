export default class Utils {

    static camelCase = function snakeToCamelCase(json) {
        return json.replace(/([-_][a-z])/g, (capturedGroup) => capturedGroup[1].toUpperCase());
    }

    static toDateObj = function stringToDateObj(key, value) {
        if (key === 'date') return new Date(value);
        return value;
    }

    static capitalize = function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

}