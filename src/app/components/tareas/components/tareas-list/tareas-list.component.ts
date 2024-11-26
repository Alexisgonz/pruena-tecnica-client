import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Tarea } from '../../../../shared/interfaces/tareas.interface';
import { TareasFormComponent } from '../tareas-form/tareas-form.component';
import { TareasService } from '../../service/tareas.service';
import { ToastServiceService } from '../../../../shared/service/toast-service.service';

@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.css'],
})
export class TareasListComponent implements OnInit {
  @ViewChild('dt', { static: true }) dt!: Table;
  menuOptions: MenuItem[] = [];
  selectedRow: Tarea | undefined;
  tarea: Tarea[] = [];

  constructor(
    private dialogSerivce: DialogService,
    private tareaService: TareasService,
    private toastService: ToastServiceService
  ) {}

  ngOnInit(): void {
    this.configTable();
    this.setMenuOptions();

    this.tareaService.getTareas().subscribe((tareas) => {
      this.tarea = tareas;

    });
  }

  configTable(): void {
    this.dt.sortMode = 'multiple';
    this.dt.sortOrder = 1;
    this.dt.sortField = 'id';
    this.dt.multiSortMeta = [{ field: 'nombre', order: -1 }];
    this.dt.columns = [
      { field: 'id', header: 'ID' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'color', header: 'Color' },
    ];
    this.dt.paginator = false;
    this.dt.rows = 10;
    this.dt.responsive = true;
    this.dt.columnResizeMode = 'expand';
    this.dt.globalFilterFields = ['nombre', 'descripcion'];
    this.dt.reorderableColumns = true;
    this.dt.rowHover = true;
    this.dt.styleClass = 'p-datatable-striped p-datatable-gridlines';
    this.dt.paginator = true;
    this.dt.rows = 10;
    this.dt.showCurrentPageReport = true;
    this.dt.currentPageReportTemplate =
      'Mostrando {first} a {last} de {totalRecords}';
    this.dt.rowsPerPageOptions = [10, 25, 50];
  }

  setMenuOptions(): void {
    this.menuOptions = [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => this.editTarea(),
      },
      {
        separator: true,
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        styleClass: 'danger-text',
        command: () => {
          if (!this.selectedRow) return;
          this.toastService.showSuccess(
            '¿Estás seguro de eliminar esta tarea?'
          );

          this.deleteSelectedRow();
        },
      },
    ];
  }

  deleteSelectedRow(): void {
    if (!this.selectedRow) return;

    this.tareaService.deleteTarea(this.selectedRow?.id).subscribe(() => {
      this.toastService.showSuccess('Tarea eliminada');
    });
  }

  addNuewTarea(): void {
    const dialogRef = this.dialogSerivce.open(TareasFormComponent, {
      header: 'Nueva Tarea',
      width: '70%',
      contentStyle: { 'max-height': '350px', overflow: 'auto' },
    });
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  editTarea(): void {
    const dialogRef = this.dialogSerivce.open(TareasFormComponent, {
      header: 'Editar Tarea',
      width: '70%',
      data: this.selectedRow,
      contentStyle: { 'max-height': '350px', overflow: 'auto' },
    });
    dialogRef.onClose.subscribe((result) => {
      if (result) {
        console.log(result);
      }
    });
  }
}
