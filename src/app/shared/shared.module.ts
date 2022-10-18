import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { WorldsComponent } from './components/worlds/worlds.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WorldsComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, WorldsComponent],
})
export class SharedModule {}
