export function determineModifiedValue(name, value, previousValue) {
    let result = false;
    const compareItem = (previousValue === null) ? "" : previousValue;
    (compareItem.toLowerCase() !== value) ? result = true : result = false;
    return result;
}
