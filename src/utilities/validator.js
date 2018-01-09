export function validateRange(value, min, max) {
    if (Number.isNaN(+value)) {
        return false;
    }
    if (value <= max && value >= min) {
        return true;
    }
    return false;
}

export function inRangeOrEmpty(value, min, max) {
    if (!value) {
        return true;
    }
    return validateRange(value, min, max);
}
