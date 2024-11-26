import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { CreateTarea, Tarea } from '../../../shared/interfaces/tareas.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  apiUrl = environment.api;
  tareas = `${this.apiUrl}/tareas`;

  constructor(private http: HttpClient) { }

  getTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.tareas);
  }

  createTarea(tarea: CreateTarea): Observable<Tarea> {
    return this.http.post<Tarea>(this.tareas, tarea);
  }

  updateTarea(id: number, data: Partial<CreateTarea>): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.tareas}/${id}`, data);
  }

  deleteTarea(id: number) {
    return this.http.delete<Tarea>(`${this.tareas}/${id}`);
  }

}
