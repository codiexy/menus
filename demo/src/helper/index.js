
export const trimString = (address, length = 4) => {
    address = typeof address == "string" && address.trim() ? address.trim() : '';
    if (address) {
        return address.length > length ? `${address.substring(0, length - 1)}...${address.substr(address.length - length - 1)}` : address;
    }
    return '';
}

export const subString = (str, length = 25) => {
    str = str && str.trim() ? str.trim() : '';
    if (str) {
        return str.length > (length - 3) ? `${str.substring(0, length - 3)}...` : str;
    }
    return '';
}