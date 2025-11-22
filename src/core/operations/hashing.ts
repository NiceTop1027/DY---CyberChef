import type { Operation } from '../types';
import CryptoJS from 'crypto-js';

export const MD5: Operation = {
    id: 'md5',
    name: 'MD5',
    description: 'MD5 해시를 생성합니다.',
    category: '해시 (Hashing)',
    run: (input: string) => CryptoJS.MD5(input).toString()
};

export const SHA1: Operation = {
    id: 'sha1',
    name: 'SHA1',
    description: 'SHA1 해시를 생성합니다.',
    category: '해시 (Hashing)',
    run: (input: string) => CryptoJS.SHA1(input).toString()
};

export const SHA256: Operation = {
    id: 'sha256',
    name: 'SHA256',
    description: 'SHA256 해시를 생성합니다.',
    category: '해시 (Hashing)',
    run: (input: string) => CryptoJS.SHA256(input).toString()
};

export const SHA512: Operation = {
    id: 'sha512',
    name: 'SHA512',
    description: 'SHA512 해시를 생성합니다.',
    category: '해시 (Hashing)',
    run: (input: string) => CryptoJS.SHA512(input).toString()
};
