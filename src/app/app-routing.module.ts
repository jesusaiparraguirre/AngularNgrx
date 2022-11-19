import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    loadChildren: () => import("./features/login/login.module").then(m => m.LoginPageModule),
    // canActivate: [LoginGuard],
  },
  {
    path: "tasks",
    loadChildren: () => import("./features/task/task.module").then(m => m.TaskPageModule),
    canActivate: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
