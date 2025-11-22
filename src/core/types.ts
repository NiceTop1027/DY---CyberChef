export interface Operation {
    id: string;
    name: string;
    description: string;
    category: string;
    run: (input: string, args?: unknown[]) => string;
}

export interface RecipeItem {
    id: string;
    operationId: string;
    args: unknown[];
}

export type DragData =
    | { type: 'sidebar-op'; op: Operation }
    | { type: 'recipe-item'; item: RecipeItem };
