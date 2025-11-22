import React, { useRef, useState } from 'react';
import { Trash2, Download, Copy, FolderOpen, ArrowRightFromLine, ArrowLeftFromLine } from 'lucide-react';

interface IOAreaProps {
    input: string;
    setInput: (value: string) => void;
    output: string;
}

export const IOArea: React.FC<IOAreaProps> = ({ input, setInput, output }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [copyFeedback, setCopyFeedback] = useState('');

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result as string;
            setInput(content);
        };
        reader.readAsText(file);
        // Reset value so same file can be selected again
        e.target.value = '';
    };

    const handleDownload = () => {
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'dy-chef-output.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(output);
            setCopyFeedback('Copied!');
            setTimeout(() => setCopyFeedback(''), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <section className="io-container">
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileUpload}
            />

            {/* Input Section */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{
                    padding: '10px 15px',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-panel)' // Use var
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowRightFromLine size={16} color="var(--primary)" />
                        <span>입력 (Input)</span>
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            className="cyber-button secondary"
                            onClick={() => fileInputRef.current?.click()}
                            title="파일 열기"
                        >
                            <FolderOpen size={14} style={{ marginRight: '4px' }} /> 열기
                        </button>
                        <button
                            className="cyber-button secondary"
                            onClick={() => setInput('')}
                            title="지우기"
                        >
                            <Trash2 size={14} style={{ marginRight: '4px' }} /> 지우기
                        </button>
                    </div>
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    style={{
                        flex: 1,
                        backgroundColor: 'var(--bg-app)',
                        border: 'none',
                        color: 'var(--text-main)',
                        padding: '15px',
                        resize: 'none',
                        outline: 'none',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        lineHeight: '1.5'
                    }}
                    placeholder="여기에 데이터를 입력하거나 파일을 드래그하세요..."
                />
                <div style={{ padding: '5px 15px', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', textAlign: 'right', backgroundColor: 'var(--bg-app)' }}>
                    Length: {input.length.toLocaleString()} chars
                </div>
            </div>

            {/* Output Section */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{
                    padding: '10px 15px',
                    borderBottom: '1px solid var(--border-color)',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'var(--bg-panel)'
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <ArrowLeftFromLine size={16} color="var(--secondary)" />
                        <span>출력 (Output)</span>
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            className="cyber-button secondary"
                            onClick={handleDownload}
                            title="저장"
                        >
                            <Download size={14} style={{ marginRight: '4px' }} /> 저장
                        </button>
                        <button
                            className="cyber-button"
                            onClick={handleCopy}
                            title="복사"
                        >
                            <Copy size={14} style={{ marginRight: '4px' }} />
                            {copyFeedback || '복사'}
                        </button>
                    </div>
                </div>
                <textarea
                    readOnly
                    value={output}
                    style={{
                        flex: 1,
                        backgroundColor: 'var(--bg-app)',
                        border: 'none',
                        color: 'var(--text-main)',
                        padding: '15px',
                        resize: 'none',
                        outline: 'none',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem',
                        lineHeight: '1.5'
                    }}
                    placeholder="결과가 여기에 표시됩니다..."
                />
                <div style={{ padding: '5px 15px', fontSize: '0.75rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', textAlign: 'right', backgroundColor: 'var(--bg-app)' }}>
                    Length: {output.length.toLocaleString()} chars
                </div>
            </div>
        </section>
    );
};
