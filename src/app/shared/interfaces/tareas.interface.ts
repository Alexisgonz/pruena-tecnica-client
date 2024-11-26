export interface Tarea{
    id: number;
    nombre: string;
    descripcion: string;
}

export type CreateTarea = Required<Omit<Tarea, 'id'>>;
