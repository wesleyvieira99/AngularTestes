import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'photos', component: PhotoListComponent },
  { path: '**', redirectTo: 'photos' } //se digitar uma URL que não existe caia na rota de listagem de photos
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
