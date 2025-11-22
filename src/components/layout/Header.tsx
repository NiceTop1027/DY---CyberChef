import React from 'react';

export const Header: React.FC = () => {
    return (
        <header style={{
            height: '60px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 20px',
            backgroundColor: '#1a1d29',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img
                    src="https://i.namu.wiki/i/ObQ4LgeNZBe9Mz-E8da2_QVnq2TP-xoSU0cNj9m3c5rnVv0k1ag1X9W9a28WTtUTeksCmHmOFhBjtyBrgR3k-Q.png"
                    alt="DY Logo"
                    style={{ height: '40px', objectFit: 'contain' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{
                        fontSize: '1.4rem',
                        fontWeight: '900',
                        color: '#fff',
                        letterSpacing: '1px',
                        lineHeight: '1',
                        textShadow: '0 0 10px rgba(0, 255, 65, 0.5)'
                    }}>
                        DY-CHEF
                    </span>
                    <span style={{
                        fontSize: '0.7rem',
                        color: 'var(--primary)',
                        letterSpacing: '2px',
                        fontWeight: 'bold',
                        textTransform: 'uppercase'
                    }}>
                        Dukyoung Cyber Operations
                    </span>
                </div>
            </div>
        </header>
    );
};
