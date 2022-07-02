import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ForecastComponent } from './forecast/forecast.component';
import { HistoryComponent } from './history/history.component';
import { ReadComponent } from './read/read.component';

const routes: Routes = [
  {path: 'create', component:CreateComponent},
  {path: 'read', component:ReadComponent},
  {path: 'forecast', component:ForecastComponent},
  {path: 'history', component:HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
