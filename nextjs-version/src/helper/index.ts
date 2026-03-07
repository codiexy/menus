
export const trimString = (address: any, length = 4) => {
    address = typeof address == "string" && address.trim() ? address.trim() : '';
    if (address) {
        return address.length > length ? `${address.substring(0, length - 1)}...${address.substr(address.length - length - 1)}` : address;
    }
    return '';
}

export const subString = (str: any, length = 25) => {
    str = str && str.trim() ? str.trim() : '';
    if (str) {
        return str.length > (length - 3) ? `${str.substring(0, length - 3)}...` : str;
    }
    return '';
}

export const ucfirst = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const slug = (str: string, seperator: string = "-") => {
    return str.trim()
        .toLowerCase()
        .replaceAll("  ", " ")
        .replaceAll(" ", seperator)
        .replaceAll("_", seperator);
}

export const trim = (str: string, seperator: string = " ") => {
    const regex = new RegExp(`^[${seperator}]+|[${seperator}]+$`, 'g');
    return str.replace(regex, '');
}

export const getBaseUrl = (url: string = "") => {
    const APP_BASE_URL = process.env.BASE_URL || "http://localhost:3000";
    let baseURL = trim(APP_BASE_URL, "/");
    url = trim(url, "/");
    return `${baseURL}/${url}`;
}

export const getUserRole = (user: any) => {
    if(user) {
        let customClaims = user?.reloadUserInfo?.customAttributes || "";
        if(customClaims) {
            customClaims = JSON.parse(customClaims);
            return customClaims?.role || "";
        }
    }
    return "";
}

export const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}