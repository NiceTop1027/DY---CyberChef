import type { Operation } from '../types';

export const ToUpperCase: Operation = {
    id: 'to_upper',
    name: '대문자로 변환 (To Upper Case)',
    description: '모든 문자를 대문자로 변환합니다.',
    category: '유틸리티 (Utils)',
    run: (input: string) => input.toUpperCase()
};

export const ToLowerCase: Operation = {
    id: 'to_lower',
    name: '소문자로 변환 (To Lower Case)',
    description: '모든 문자를 소문자로 변환합니다.',
    category: '유틸리티 (Utils)',
    run: (input: string) => input.toLowerCase()
};

export const Reverse: Operation = {
    id: 'reverse',
    name: '문자열 뒤집기 (Reverse)',
    description: '문자열의 순서를 뒤집습니다.',
    category: '유틸리티 (Utils)',
    run: (input: string) => input.split('').reverse().join('')
};

export const RemoveWhitespace: Operation = {
    id: 'remove_whitespace',
    name: '공백 제거 (Remove Whitespace)',
    description: '모든 공백 문자를 제거합니다.',
    category: '유틸리티 (Utils)',
    run: (input: string) => input.replace(/\s+/g, '')
};
