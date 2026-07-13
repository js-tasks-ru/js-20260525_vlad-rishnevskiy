/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(str, size) {
  if (size === undefined) {
    return str;
  }
  if (size <= 0) {
    return "";
  }

  let result = "";
  let count = 0;
  let prev = "";

  for (const char of str) {
    if (char === prev) {
      count++;
    } else {
      prev = char;
      count = 1;
    }

    if (count <= size) {
      result += char;
    }
  }

  return result;
}
