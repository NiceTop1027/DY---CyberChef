import type { Operation } from '../types';
import { ToBase64, FromBase64 } from './base64';
import { ToHex, FromHex } from './hex';
import { UrlEncode, UrlDecode } from './url';
import { MD5, SHA1, SHA256, SHA512 } from './hashing';
import { ROT13 } from './encryption';
import { ToUpperCase, ToLowerCase, Reverse, RemoveWhitespace } from './utils';
import { FromUnixTimestamp, ToUnixTimestamp } from './datetime';
import { JWTDecode, JSONPrettify, JSONMinify, DefangURL, FangURL } from './web_utils';
import { HTMLEntityEncode, HTMLEntityDecode } from './html_entity';
import { ToBinary, FromBinary } from './binary';

// Central registry of all operations
export const operations: Operation[] = [
    // Data Format
    ToBase64, FromBase64,
    ToHex, FromHex,
    ToBinary, FromBinary,
    JSONPrettify, JSONMinify,

    // Web
    UrlEncode, UrlDecode,
    HTMLEntityEncode, HTMLEntityDecode,
    JWTDecode,

    // Network
    DefangURL, FangURL,

    // Hashing
    MD5, SHA1, SHA256, SHA512,

    // Encryption
    ROT13,

    // Utils
    ToUpperCase, ToLowerCase, Reverse, RemoveWhitespace,

    // Date/Time
    FromUnixTimestamp, ToUnixTimestamp
];

export const getOperationById = (id: string): Operation | undefined => {
    return operations.find(op => op.id === id);
};

export const getCategories = (): string[] => {
    return Array.from(new Set(operations.map(op => op.category))).sort();
};

export const getOperationsByCategory = (category: string): Operation[] => {
    return operations.filter(op => op.category === category);
};
