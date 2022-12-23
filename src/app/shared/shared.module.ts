import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { WorldsComponent } from './components/worlds/worlds.component';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ColorPipe } from './pipes/color.pipe';
import { WorldComponent } from './components/world/world.component';
import { StatsSkillPipe } from './pipes/stats-skill.pipe';
import { AddWorldDialogComponent } from './components/worlds/add-world-dialog/add-world-dialog.component';

@NgModule({
  declarations: [
    WorldsComponent,
    ColorPipe,
    WorldComponent,
    StatsSkillPipe,
    AddWorldDialogComponent,    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    WorldsComponent,
    ScrollingModule,
    ColorPipe,
    StatsSkillPipe,
    AddWorldDialogComponent,
  ],
})
export class SharedModule {}
