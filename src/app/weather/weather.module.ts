import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SearchbarComponent } from './searchbar/searchbar.component';
import { ResultBarComponent } from './result-bar/result-bar.component';

@NgModule({
  declarations: [SearchbarComponent, ResultBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
  ],
  exports: [SearchbarComponent, ResultBarComponent],
})
export class WeatherModule {}
