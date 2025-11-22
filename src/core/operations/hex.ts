import type { Operation } from '../types';

export const ToHex: Operation = {
    id: 'to_hex',
    name: 'Hex 인코딩 (To Hex)',
    description: '데이터를 16진수(Hex)로 변환합니다.',
    category: '데이터 형식 (Data Format)',
    run: (input: string) => {
        return input.split('').map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
    }
};

export const FromHex: Operation = {
    id: 'from_hex',
    name: 'Hex 디코딩 (From Hex)',
    description: '16진수 데이터를 원본으로 변환합니다.',
    category: '데이터 형식 (Data Format)',
    run: (input: string) => {
        try {
            return input.replace(/\s/g, '').match(/.{1,2}/g)?.map(byte => String.fromCharCode(parseInt(byte, 16))).join('') || '';
        } catch {
            return 'Error: Invalid Hex input.';
        }
    }
};
