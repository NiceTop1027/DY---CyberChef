import type { Operation } from '../types';

export const HTMLEntityEncode: Operation = {
    id: 'html_entity_encode',
    name: 'HTML 엔티티 인코딩 (HTML Entity Encode)',
    description: '특수 문자를 HTML 엔티티로 변환합니다.',
    category: '웹 (Web)',
    run: (input: string) => {
        return input.replace(/[\u00A0-\u9999<>&]/g, function (i) {
            return '&#' + i.charCodeAt(0) + ';';
        });
    }
};

export const HTMLEntityDecode: Operation = {
    id: 'html_entity_decode',
    name: 'HTML 엔티티 디코딩 (HTML Entity Decode)',
    description: 'HTML 엔티티를 원래 문자로 변환합니다.',
    category: '웹 (Web)',
    run: (input: string) => {
        const doc = new DOMParser().parseFromString(input, "text/html");
        return doc.documentElement.textContent || "";
    }
};
