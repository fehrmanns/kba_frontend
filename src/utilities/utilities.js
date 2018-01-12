import {intlShape} from "react-intl";

export function determineModifiedValue(name, value, previousValue) {
    let result = false;
    let compareItem = (previousValue === null) ? "" : previousValue;
    compareItem = (typeof compareItem === "string") ? compareItem.toLowerCase() : compareItem;
    (compareItem !== value) ? result = true : result = false;
    return result;
}
