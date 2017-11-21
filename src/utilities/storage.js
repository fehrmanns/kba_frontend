
export function toggleItem(itemName) {
    if (typeof (Storage) !== "undefined") {

        let storageItem = localStorage.getItem(itemName);
        (storageItem === JSON.stringify(true)) ? localStorage.setItem(itemName, JSON.stringify(false)) : localStorage.setItem(itemName, JSON.stringify(true));

    } else {
        // Sorry! No Web Storage support..
        noSupport();
    }
}

export function getItem(itemName) {
    if (typeof (Storage) !== "undefined") {

        let storageItem = localStorage.getItem(itemName);
        if( storageItem === "true") {
            return true;
        } else if( storageItem === "false" ) {
            return false;
        } else {
            return  JSON.parse(storageItem);
        }

    } else {
        // Sorry! No Web Storage support..
        noSupport();
        return null;
    }
}

export function setItem(itemName, value) {
    if (typeof (Storage) !== "undefined") {
        localStorage.setItem(itemName, JSON.stringify(value));
    } else {
        // Sorry! No Web Storage support..
        noSupport();
    }
}

function noSupport() {
    console.warn("no support for local storage");
}
