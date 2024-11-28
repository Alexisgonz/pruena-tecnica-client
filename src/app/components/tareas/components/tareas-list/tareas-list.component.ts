import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Tarea } from '../../../../shared/interfaces/tareas.interface';
import { TareasFormComponent } from '../tareas-form/tareas-form.component';
import { TareasService } from '../../service/tareas.service';
import { ToastServiceService } from '../../../../shared/service/toast-service.service';
import { TieredMenu } from 'primeng/tieredmenu'
import { Table } from 'primeng/table'
import { take } from 'rxjs'

@Component({
  selector: 'app-tareas-list',
  templateUrl: './tareas-list.component.html',
  styleUrls: ['./tareas-list.component.css'],
})
export class TareasListComponent implements OnInit {
  items: MenuItem[] | undefined;
  contextMenu: MenuItem[] = [];
  home: MenuItem | undefined;
  tareas!: Tarea[];
  usuaroLogedd!: string;
  userId!: number;
  @ViewChild('menu') menu!: TieredMenu;
  page: number = 0;
  totalRecords!: number;
  rows: number = 10;

  constructor(
    private dialogSerivce: DialogService,
    private tareaService: TareasService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.items = [{ label: 'Mis Tareas' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };

    this.lazyTareas();
  }


  lazyTareas() {
    this.tareaService
      .getTareasPaginadas(this.page, this.rows, this.userId)
      .subscribe({
        next: (response) => {
          this.tareas = response.data;
          this.totalRecords = response.totalItems;
        },
        error: (error) => console.error('Error al cargar tareas:', error),
      });
  }

   onPageChange(event: any) {
    this.page = event.page;
    this.rows = event.rows;
    this.lazyTareas();
  }

  setMenuOptions(tarea: Tarea): MenuItem[] {
    return [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        command: () => this.viewEdit(tarea),
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => {
          console.log('log');

          this.confirmationService.confirm({
            message: 'Confirmas que borraras la tarea?',
            header: 'Corfirmación',
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'none',
            rejectIcon: 'none',
            rejectButtonStyleClass: 'p-button-text',
            accept: () => {
              this.delete(tarea.id);
            },
            reject: () => {
              this.messageService.add({
                severity: 'error',
                summary: 'Atención',
                detail: 'Sin Cambios',
                life: 3000,
              });
            },
          });
        },
      },
    ];
  }

  clear(table: Table) {
    table.clear();
  }

  setMenu(tarea: Tarea) {
    this.contextMenu = this.setMenuOptions(tarea);
  }

  viewEdit(tarea: Tarea) {
    const dialogRef = this.dialogSerivce.open(TareasFormComponent, {
      header: 'Editar Tarea',
      width: '60vw',
      baseZIndex: 10000,
      data: tarea,
      dismissableMask: false,
      maximizable: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
    dialogRef.onClose.subscribe((res: any) => {
      if (res) {
        this.lazyTareas();
      }
    });
  }

   onAdd() {
    const dialogRef = this.dialogSerivce.open(TareasFormComponent, {
      header: 'Nueva Tarea',
      width: '60vw',
      baseZIndex: 10000,
      data: { userId: this.userId },
      dismissableMask: false,
      maximizable: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
    });
    dialogRef.onClose.subscribe((res: any) => {
      if (res) {
        this.lazyTareas();
      }
    });
  }

  delete(id: number) {
    if (!id) return;
    this.tareaService
      .deleteTarea(id)
      .pipe(take(1))
      .subscribe({
        next:(res: boolean) => {
          if (res) {
            this.lazyTareas();
          }
        },
        error: (err: Error) => {
          this
        },
      });
  }
  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Atención',
      detail: 'Error Inesperado',
    });
  }
}
