import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
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
  }

  initForm(): void {
    this.form = this.fb.group({
      nombre: [''],
      descripcion: [''],
    });
  }

  onSubmit(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    const formValue = this.form.getRawValue();

    if (this.config.data) {
      this.tareasService
        .updateTarea(this.config.data.id, formValue)
        .subscribe((tarea) => {
          this.ref.close(tarea);
          this.toastService.showSuccess('Tarea actualizada');
        });
      return;
    }

    this.tareasService.createTarea(formValue).subscribe((tarea) => {
      this.ref.close(tarea);
      this.toastService.showSuccess('Tarea creada');
    });
  }

  onCancel() {
    this.ref.close();
  }
}
