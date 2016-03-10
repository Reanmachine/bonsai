import basex from "base-x";

const base58 = basex("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");

export var isDebug = true;

export function debug(/* ... arguments ... */) {
    if (!isDebug) {
        return;
    }

    console.group("BONSAI DEBUG");
    console.log(...arguments);
    console.groupEnd("BONSAI DEBUG");
}

export function ensureString(key, value, isEmptyAllowed = false) {
    if (!value || value === '') {
        if (!isEmptyAllowed) {
            throw new Error(`The value '${key}' cannot be empty.`);
        }

        return;
    }

    if (typeof value !== "string") {
        throw new Error(`The value '${key}' must be a string.`);
    }
}

const charsetStandard = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const charsetHexadecimal = "ABCDEF0123456789";

export function randString(length, charset = charsetStandard) {
    var bucket = [];

    for(let i = 0; i < length; i++) {
        let charIndex = Math.floor(Math.random() * charset.length);
        bucket.push(charset[charIndex]);
    }

    return bucket.join("");
}

export function randHexString(length) {
    return randString(length, charsetHexadecimal);
}

export function encodeIdentifier(id) {
    return base58.encode([id]);
}

export function decodeIdentifier(identifier) {
    let bytes = base58.decode(identifier);

    let number = 0;
    for(let i = 0; i < bytes.length; i++) {
        let multiplier = Math.pow(256, i);
        number += bytes[i] * multiplier;
    }

    return number;
}