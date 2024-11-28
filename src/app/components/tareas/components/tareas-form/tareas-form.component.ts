import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TareasService } from '../../service/tareas.service';
import { Tarea } from '../../../../shared/interfaces/tareas.interface';
import { ToastServiceService } from '../../../../shared/service/toast-service.service';

@Component({
  selector: 'app-tareas-form',
  templateUrl: './tareas-form.component.html',
  styleUrls: ['./tareas-form.component.css'],
})
export class TareasFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: NonNullableFormBuilder,
    public ref: DynamicDialogRef,
    private tareasService: TareasService,
    private config: DynamicDialogConfig<Tarea>,
    private toastService: ToastServiceService
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.config.data) {
      console.log('Datos recibidos para edición:', this.config.data);
      this.form.patchValue(this.config.data);
    }
  }

  initForm(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const formValue = this.form.getRawValue();
    if (this.config.data?.id) {
      this.tareasService.updateTarea(this.config.data.id, formValue).subscribe({
        next: (tarea) => {
          this.ref.close(tarea);
          this.toastService.showSuccess('Tarea actualizada');
        },
        error: (error) => {
          console.error('Error al actualizar la tarea:', error);
        },
      });
    } else {
      this.tareasService.createTarea(formValue).subscribe({
        next: (tarea) => {
          this.ref.close(tarea);
          this.toastService.showSuccess('Tarea creada');
        },
        error: (error) => {
          console.error('Error al crear la tarea:', error);
        },
      });
    }
  }

  onCancel() {
    this.ref.close();
  }
}
