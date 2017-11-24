
export function toggleItem(itemName) {
    if (typeof (Storage) !== "undefined") {
        // Code for localStorage/sessionStorage.
        const storageItem = localStorage.getItem(itemName);
        (storageItem === "true") ? localStorage.setItem(itemName, false) : localStorage.setItem(itemName, true);
    } else {
        // Sorry! No Web Storage support..
        noSupport();
    }
}

export function getItem(itemName) {
    if (typeof (Storage) !== "undefined") {
        const storageItem = localStorage.getItem(itemName);
        return storageItem;
    }
    // Sorry! No Web Storage support..
    noSupport();
}

export function setItem(itemName, value) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(itemName, value);
    } else {
        // Sorry! No Web Storage support..
        noSupport();
    }
}

function noSupport() {
    console.warn("no support for local storage");
}
