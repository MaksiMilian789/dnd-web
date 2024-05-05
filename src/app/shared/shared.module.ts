import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material.module';
import { TaigaModule } from './taiga.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { ColorPipe } from './pipes/color.pipe';
import { StatsSkillPipe } from './pipes/stats-skill.pipe';
import { WorldComponent } from './components/world/world.component';
import { SimpleDialogComponent } from './components/simple-dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog';
import { WikiComponent } from './components/wiki/wiki.component';
import { WorldsComponent } from './components/worlds/worlds.component';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    WorldsComponent,
    WorldComponent,
    WikiComponent,
    SimpleDialogComponent,
    ConfirmationDialogComponent,

    ColorPipe, 
    StatsSkillPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    MaterialModule,
    TaigaModule,    
    AngularEditorModule 
  ],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ScrollingModule,
    MaterialModule,
    TaigaModule,   
    AngularEditorModule,

    WorldsComponent,

    ColorPipe,
    StatsSkillPipe
  ],
})
export class SharedModule {}
