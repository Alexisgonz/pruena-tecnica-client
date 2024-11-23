import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginClientComponent } from './components/login-client/login-client.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginClientComponent,
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [],
  exports: [],
})
export class AuthModule {}
