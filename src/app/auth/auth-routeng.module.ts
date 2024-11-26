import { RouterModule, Routes } from "@angular/router";
import { LoginClientComponent } from "./components/login-client/login-client.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  { path: 'login', component: LoginClientComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
