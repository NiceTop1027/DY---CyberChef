import type { Operation } from '../types';

export const UrlEncode: Operation = {
    id: 'url_encode',
    name: 'URL 인코딩 (URL Encode)',
    description: 'URL 안전 문자로 변환합니다.',
    category: '웹 (Web)',
    run: (input: string) => encodeURIComponent(input)
};

export const UrlDecode: Operation = {
    id: 'url_decode',
    name: 'URL 디코딩 (URL Decode)',
    description: 'URL 인코딩된 문자를 복원합니다.',
    category: '웹 (Web)',
    run: (input: string) => decodeURIComponent(input)
};
