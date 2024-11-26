import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareasListComponent } from './components/tareas-list/tareas-list.component';
import { RouterModule, Routes } from '@angular/router';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { TareasFormComponent } from './components/tareas-form/tareas-form.component';
import { ToastServiceService } from '../../shared/service/toast-service.service';
import { MessageService } from 'primeng/api';

const routes: Routes = [
  {
    path: '',
    component: TareasListComponent,
  },
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ButtonModule,
    TableModule,
    InputTextModule,
    ReactiveFormsModule,
    DynamicDialogModule,
  ],
  declarations: [TareasListComponent, TareasFormComponent],
  providers: [DialogService, ToastServiceService, MessageService],
})
export class TareasModule {}
