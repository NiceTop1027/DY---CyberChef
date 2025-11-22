import type { Operation } from '../types';

export const JWTDecode: Operation = {
    id: 'jwt_decode',
    name: 'JWT 디코딩 (JWT Decode)',
    description: 'JWT(JSON Web Token)의 페이로드를 디코딩합니다.',
    category: '웹 (Web)',
    run: (input: string) => {
        try {
            const parts = input.split('.');
            if (parts.length !== 3) return 'Error: Invalid JWT format (must have 3 parts)';
            const payload = parts[1];
            const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.stringify(JSON.parse(jsonPayload), null, 2);
        } catch {
            return 'Error: Failed to decode JWT';
        }
    }
};

export const JSONPrettify: Operation = {
    id: 'json_prettify',
    name: 'JSON 정렬 (JSON Prettify)',
    description: 'JSON 데이터를 보기 좋게 들여쓰기합니다.',
    category: '데이터 형식 (Data Format)',
    run: (input: string) => {
        try {
            return JSON.stringify(JSON.parse(input), null, 2);
        } catch {
            return 'Error: Invalid JSON';
        }
    }
};

export const JSONMinify: Operation = {
    id: 'json_minify',
    name: 'JSON 압축 (JSON Minify)',
    description: 'JSON 데이터의 공백을 제거합니다.',
    category: '데이터 형식 (Data Format)',
    run: (input: string) => {
        try {
            return JSON.stringify(JSON.parse(input));
        } catch {
            return 'Error: Invalid JSON';
        }
    }
};

export const DefangURL: Operation = {
    id: 'defang_url',
    name: 'URL 무력화 (Defang URL)',
    description: '링크가 클릭되지 않도록 URL을 변경합니다 (예: http -> hxxp).',
    category: '네트워크 (Network)',
    run: (input: string) => {
        return input
            .replace(/http/gi, 'hxxp')
            .replace(/\./g, '[.]');
    }
};

export const FangURL: Operation = {
    id: 'fang_url',
    name: 'URL 복구 (Fang URL)',
    description: '무력화된 URL을 원래대로 복구합니다.',
    category: '네트워크 (Network)',
    run: (input: string) => {
        return input
            .replace(/hxxp/gi, 'http')
            .replace(/\[\.\]/g, '.');
    }
};
