import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MaterialModule } from './material.module';
import { TaigaModule } from './taiga.module';

import { ColorPipe } from './pipes/color.pipe';
import { StatsSkillPipe } from './pipes/stats-skill.pipe';
import { AddWorldDialogComponent } from '../master/world/components/add-world-dialog/add-world-dialog.component';
import { EditWorldDialogComponent } from '../master/world/components/edit-world-dialog/edit-world-dialog.component';
import { WorldComponent } from './components/world/world.component';
import { WorldsComponent } from './components/worlds/worlds.component';
import { SimpleDialogComponent } from './components/simple-dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog';
import { WikiComponent } from './components/wiki/wiki.component';

@NgModule({
  declarations: [
    WorldsComponent,
    WorldComponent,
    WikiComponent,
    AddWorldDialogComponent,
    EditWorldDialogComponent, 
    SimpleDialogComponent,
    ConfirmationDialogComponent,

    ColorPipe, 
    StatsSkillPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule,
    MaterialModule,
    TaigaModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ScrollingModule,
    ReactiveFormsModule,
    MaterialModule,
    TaigaModule,

    WorldsComponent,
    ScrollingModule,
    AddWorldDialogComponent,
    EditWorldDialogComponent,

    ColorPipe,
    StatsSkillPipe
  ],
})
export class SharedModule {}
