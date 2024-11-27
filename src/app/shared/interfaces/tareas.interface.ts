export interface Tarea{
    id: number;
    nombre: string;
    descripcion: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateTarea = Required<Omit<Tarea, 'id'>>;
