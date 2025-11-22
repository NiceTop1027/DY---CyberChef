import React from 'react';
import type { RecipeItem } from '../../core/types';
import { getOperationById } from '../../core/operations';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChefHat, Save, RotateCcw, FolderOpen, Trash2 } from 'lucide-react';

interface RecipeAreaProps {
    recipe: RecipeItem[];
    onRemoveOperation: (id: string) => void;
}

const SortableRecipeItem = ({ item, index, onRemove }: { item: RecipeItem, index: number, onRemove: (id: string) => void }) => {
    const op = getOperationById(item.operationId);
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: item.id,
        data: {
            type: 'recipe-item',
            item
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={{
                ...style,
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '2px',
                marginBottom: '8px',
                overflow: 'hidden',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
        >
            {/* Operation Header */}
            <div
                {...attributes}
                {...listeners}
                style={{
                    padding: '8px 10px',
                    backgroundColor: '#252836',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--border-color)',
                    cursor: 'grab'
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ color: 'var(--text-muted)', marginRight: '10px', fontSize: '0.8rem', width: '20px' }}>{index + 1}</span>
                    <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '0.9rem' }}>{op?.name || 'Unknown'}</span>
                </div>
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // Prevent drag start
                        onRemove(item.id);
                    }}
                    style={{
                        color: 'var(--text-muted)',
                        fontSize: '1.2rem',
                        padding: '0 5px',
                        lineHeight: '1',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                    title="제거"
                >
                    <Trash2 size={14} />
                </button>
            </div>

            {/* Operation Body (Args placeholder) */}
            <div style={{ padding: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {/* Arguments would go here */}
                설정 옵션 없음
            </div>
        </div>
    );
};

export const RecipeArea: React.FC<RecipeAreaProps> = ({ recipe, onRemoveOperation }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: 'recipe-area',
    });

    return (
        <section className="recipe-container">
            {/* Recipe Header / Toolbar */}
            <div style={{
                padding: '10px',
                borderBottom: '1px solid var(--border-color)',
                fontWeight: 'bold',
                backgroundColor: 'var(--bg-panel)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ChefHat size={18} color="var(--primary)" />
                    <span>레시피 (Recipe)</span>
                </span>
                <div style={{ display: 'flex', gap: '5px' }}>
                    <button className="cyber-button secondary" title="Load">
                        <FolderOpen size={14} />
                    </button>
                    <button className="cyber-button secondary" title="Save">
                        <Save size={14} />
                    </button>
                    <button
                        className="cyber-button secondary"
                        onClick={() => window.location.reload()}
                        title="Clear"
                    >
                        <RotateCcw size={14} />
                    </button>
                </div>
            </div>

            {/* Recipe List */}
            <div
                ref={setNodeRef}
                style={{
                    flex: 1,
                    padding: '10px',
                    overflowY: 'auto',
                    backgroundColor: isOver ? 'rgba(0, 255, 65, 0.05)' : '#1a1d29',
                    transition: 'background-color 0.2s'
                }}
            >
                <SortableContext items={recipe.map(r => r.id)} strategy={verticalListSortingStrategy}>
                    {recipe.length === 0 ? (
                        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', opacity: 0.7 }}>
                            <div style={{ marginBottom: '15px', color: 'var(--border-color)' }}>
                                <ChefHat size={64} strokeWidth={1} />
                            </div>
                            <div>연산을 이곳으로 드래그하거나 더블 클릭하세요.</div>
                        </div>
                    ) : (
                        recipe.map((item, index) => (
                            <SortableRecipeItem
                                key={item.id}
                                item={item}
                                index={index}
                                onRemove={onRemoveOperation}
                            />
                        ))
                    )}
                </SortableContext>
            </div>
        </section>
    );
};
