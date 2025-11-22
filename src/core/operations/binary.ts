import type { Operation } from '../types';

export const ToBinary: Operation = {
    id: 'to_binary',
    name: 'To Binary',
    description: '텍스트를 2진수(Binary)로 변환합니다.',
    category: '데이터 형식 (Data Format)',
    run: (input: string) => {
        return input.split('').map(char => {
            return char.charCodeAt(0).toString(2).padStart(8, '0');
        }).join(' ');
    }
};

export const FromBinary: Operation = {
    id: 'from_binary',
    name: 'From Binary',
    description: '2진수 데이터를 텍스트로 변환합니다.',
    category: '데이터 형식 (Data Format)',
    run: (input: string) => {
        // Remove spaces and non-binary characters
        const cleanInput = input.replace(/[^01]/g, '');
        const bytes = cleanInput.match(/.{1,8}/g) || [];
        return bytes.map(byte => String.fromCharCode(parseInt(byte, 2))).join('');
    }
};
