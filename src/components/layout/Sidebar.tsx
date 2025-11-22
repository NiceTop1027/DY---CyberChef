import React, { useState } from 'react';
import { getCategories, getOperationsByCategory } from '../../core/operations';
import { useDraggable } from '@dnd-kit/core';
import type { Operation } from '../../core/types';
import { Search, ChevronRight, ChevronDown } from 'lucide-react';

const DraggableOperation = ({ op }: { op: Operation }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: op.id,
        data: {
            type: 'sidebar-op',
            op
        }
    });

    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            title={op.description}
            className="sidebar-op" // Add class for potential global style targeting
        >
            <div className="sidebar-op-item">
                {op.name}
            </div>
        </div>
    );
};

export const Sidebar: React.FC = () => {
    const categories = getCategories();
    const [expandedCategories, setExpandedCategories] = useState<string[]>(categories);
    const [searchTerm, setSearchTerm] = useState('');

    const toggleCategory = (category: string) => {
        setExpandedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    return (
        <aside className="sidebar-container">
            {/* Search Bar */}
            <div style={{ padding: '10px', borderBottom: '1px solid var(--border-color)', position: 'relative' }}>
                <Search size={16} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                    type="text"
                    placeholder="연산 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '8px 10px 8px 35px',
                        backgroundColor: 'var(--bg-app)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        color: 'var(--text-main)',
                        outline: 'none',
                        fontSize: '0.9rem'
                    }}
                />
            </div>

            {/* Categories List */}
            <div style={{ overflowY: 'auto', flex: 1 }}>
                {categories.map(category => {
                    const ops = getOperationsByCategory(category).filter(op =>
                        op.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        op.description.toLowerCase().includes(searchTerm.toLowerCase())
                    );

                    if (ops.length === 0 && searchTerm) return null;

                    const isExpanded = expandedCategories.includes(category) || searchTerm !== '';

                    return (
                        <div key={category}>
                            <div
                                onClick={() => toggleCategory(category)}
                                style={{
                                    padding: '10px 15px',
                                    backgroundColor: '#202230',
                                    borderBottom: '1px solid var(--border-color)',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    userSelect: 'none',
                                    fontSize: '0.85rem'
                                }}
                            >
                                <span>{category}</span>
                                <span style={{ color: 'var(--text-muted)', display: 'flex' }}>
                                    {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                </span>
                            </div>

                            {isExpanded && (
                                <div style={{ backgroundColor: 'var(--bg-panel)' }}>
                                    {ops.map(op => (
                                        <DraggableOperation
                                            key={op.id}
                                            op={op}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};
