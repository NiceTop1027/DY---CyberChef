import { useState, useMemo } from 'react';
import './index.css';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { RecipeArea } from './components/layout/RecipeArea';
import { IOArea } from './components/layout/IOArea';
import type { RecipeItem, DragData } from './core/types';
import { getOperationById } from './core/operations';
import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { ChefHat } from 'lucide-react';

function App() {
  const [input, setInput] = useState('');
  const [recipe, setRecipe] = useState<RecipeItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [activeDragData, setActiveDragData] = useState<DragData | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // Calculate output derived from input and recipe
  const output = useMemo(() => {
    let currentData = input;

    for (const item of recipe) {
      const operation = getOperationById(item.operationId);
      if (operation) {
        currentData = operation.run(currentData, item.args);
      }
    }

    return currentData;
  }, [input, recipe]);

  const addOperation = (operationId: string) => {
    const newItem: RecipeItem = {
      id: crypto.randomUUID(),
      operationId,
      args: []
    };
    setRecipe(prev => [...prev, newItem]);
  };

  const removeOperation = (id: string) => {
    setRecipe(prev => prev.filter(item => item.id !== id));
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setActiveDragData(event.active.data.current as DragData);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveDragData(null);

    if (!over) return;

    // Dropping from Sidebar to Recipe
    if (active.data.current?.type === 'sidebar-op' && over.id === 'recipe-area') {
      addOperation(active.id as string);
      return;
    }

    // Reordering within Recipe
    if (active.data.current?.type === 'recipe-item' && over.data.current?.type === 'recipe-item') {
      if (active.id !== over.id) {
        setRecipe((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
  };

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <main className="app-main">
          <Sidebar />
          <RecipeArea recipe={recipe} onRemoveOperation={removeOperation} />
          <IOArea input={input} setInput={setInput} output={output} />
        </main>
        <DragOverlay dropAnimation={{
          duration: 250,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}>
          {activeId && activeDragData ? (
            <div style={{
              padding: '10px 15px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--primary)',
              borderRadius: '4px',
              color: 'var(--text-main)',
              boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
              width: '250px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'grabbing'
            }}>
              <ChefHat size={20} color="var(--primary)" />
              <span style={{ fontWeight: 'bold' }}>
                {activeDragData.type === 'sidebar-op' ? activeDragData.op.name :
                  activeDragData.type === 'recipe-item' ? getOperationById(activeDragData.item.operationId)?.name : 'Operation'}
              </span>
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}

export default App;
