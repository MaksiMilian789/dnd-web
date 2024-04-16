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
import { EditWorldDialogComponent } from './components/world/edit-world-dialog/edit-world-dialog.component';
import { TaigaModule } from './taiga.module';

@NgModule({
  declarations: [
    WorldsComponent,
    ColorPipe,
    WorldComponent,
    StatsSkillPipe,
    AddWorldDialogComponent,
    EditWorldDialogComponent  
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule,
    TaigaModule
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
    EditWorldDialogComponent,
    TaigaModule
  ],
})
export class SharedModule {}
