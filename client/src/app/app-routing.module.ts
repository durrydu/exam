import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { EquipmentDetailComponent } from './equipments/equipment-detail/equipment-detail.component';
import { EquipmentListComponent } from './equipments/equipment-list/equipment-list.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { HomeComponent } from './home/home.component';
import { PreventUnsavedchangesGuardGuard } from './_guards/prevent-unsavedchanges-guard.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'equipments', component: EquipmentListComponent },
  {
    path: 'equipments/:id',
    component: EquipmentDetailComponent,
    canDeactivate: [PreventUnsavedchangesGuardGuard],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
