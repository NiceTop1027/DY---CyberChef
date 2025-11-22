import type { Operation } from '../types';

export const ROT13: Operation = {
    id: 'rot13',
    name: 'ROT13',
    description: '알파벳을 13글자씩 밀어서 치환합니다.',
    category: '암호화 (Encryption)',
    run: (input: string) => {
        return input.replace(/[a-zA-Z]/g, (c) => {
            const base = c <= 'Z' ? 65 : 97;
            return String.fromCharCode(base + (c.charCodeAt(0) - base + 13) % 26);
        });
    }
};
