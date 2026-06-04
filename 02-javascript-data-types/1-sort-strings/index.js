/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
    const sortedArr = [...arr].sort((a, b) => a.localeCompare(b, ['ru', 'en'], { caseFirst: 'upper' }));

    if (param === 'asc') {
        return sortedArr;
    } else if (param === 'desc') {
        return sortedArr.reverse();
    } else {
        throw new Error('Invalid sorting parameter. Use "asc" or "desc".');
    }
}