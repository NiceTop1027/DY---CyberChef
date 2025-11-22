import type { Operation } from '../types';

export const FromUnixTimestamp: Operation = {
    id: 'from_unix',
    name: 'Unix Timestamp 변환 (From Unix Timestamp)',
    description: 'Unix 타임스탬프를 날짜 형식으로 변환합니다.',
    category: '날짜/시간 (Date/Time)',
    run: (input: string) => {
        const timestamp = parseInt(input.trim());
        if (isNaN(timestamp)) return 'Error: Invalid timestamp';
        // Handle seconds vs milliseconds guessing
        const date = new Date(timestamp > 10000000000 ? timestamp : timestamp * 1000);
        return date.toLocaleString('ko-KR');
    }
};

export const ToUnixTimestamp: Operation = {
    id: 'to_unix',
    name: 'Unix Timestamp 생성 (To Unix Timestamp)',
    description: '현재 시간 또는 입력된 날짜를 Unix 타임스탬프로 변환합니다.',
    category: '날짜/시간 (Date/Time)',
    run: (input: string) => {
        if (!input.trim()) return Math.floor(Date.now() / 1000).toString();
        const date = new Date(input);
        if (isNaN(date.getTime())) return 'Error: Invalid date';
        return Math.floor(date.getTime() / 1000).toString();
    }
};
