import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { WorldsComponent } from './components/worlds/worlds.component';
import { RouterModule } from '@angular/router';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { ColorPipe } from './pipes/color.pipe';
import { WorldComponent } from './components/world/world.component';

@NgModule({
  declarations: [WorldsComponent, ColorPipe, WorldComponent],
  imports: [CommonModule, MaterialModule, RouterModule, FormsModule, ScrollingModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, WorldsComponent, ScrollingModule, ColorPipe],
})
export class SharedModule {}
