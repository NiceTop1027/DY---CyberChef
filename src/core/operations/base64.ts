import type { Operation } from '../types';

export const ToBase64: Operation = {
    id: 'to_base64',
    name: 'Base64 인코딩 (To Base64)',
    description: '데이터를 Base64로 인코딩합니다.',
    category: '데이터 형식 (Data Format)',
    run: (input: string) => {
        try {
            // UTF-8 safe encoding
            const bytes = new TextEncoder().encode(input);
            const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
            return btoa(binString);
        } catch {
            return 'Error: Input contains characters that cannot be encoded.';
        }
    }
};

export const FromBase64: Operation = {
    id: 'from_base64',
    name: 'Base64 디코딩 (From Base64)',
    description: 'Base64 데이터를 디코딩합니다.',
    category: '데이터 형식 (Data Format)',
    run: (input: string) => {
        try {
            // UTF-8 safe decoding
            const binString = atob(input);
            const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0) || 0);
            return new TextDecoder().decode(bytes);
        } catch {
            return 'Error: Invalid Base64 input.';
        }
    }
};
