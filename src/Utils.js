export default class Utils {
    /**
     *  Converts snake_case to camelCase in given JSON (string);
     */
    static camelCase = function snakeToCamelCase(json) {
        return json.replace(/([-_][a-z])/g, (capturedGroup) => capturedGroup[1].toUpperCase());
    }
    /**
     *  Transforms date string format to Date object
     */
    static toDateObj = function stringToDateObj(key, value) {
        if (key === 'date') return new Date(value);
        return value;
    }
    /**
     *  Capitalizes first letter in given word (string).
     */
    static capitalize = function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    /**
     * Removes any trailing commas in given JSON (string);
     * Find ,, after which there is no any new attribute, object or array.
     * New attribute could start either with quotes (" or ') or with any word-character (\w).
     * New object could start only with character {.
     * New array could start only with character [.
     * New attribute, object or array could be placed after a bunch of space-like symbols (\s).
     */
    static removeTrailingComma = function removeTrailingCommaFromJSON(json) {
        return json.replace(/\,(?!\s*?[\{\[\"\'\w])/g, '');
    }
}