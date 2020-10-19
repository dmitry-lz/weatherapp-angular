import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ResultBarComponent } from './weather/result-bar/result-bar.component';

import { SearchbarComponent } from './weather/searchbar/searchbar.component'; 

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: ':id', component: ResultBarComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
