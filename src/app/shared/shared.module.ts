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
import { WikiHomeComponent } from './components/wiki-home/wiki-home.component';
import { OpenImageDialogComponent } from './components/open-image-dialog/open-image-dialog.component';
import { SkillInfoTableComponent } from './components/skill-info-table/skill-info-table.component';
import { InventoryInfoTableComponent } from './components/inventory-info-table/inventory-info-table.component';

@NgModule({
  declarations: [
    WorldsComponent,
    WorldComponent,
    WikiComponent,
    SimpleDialogComponent,
    ConfirmationDialogComponent,
    WikiHomeComponent,
    OpenImageDialogComponent,
    SkillInfoTableComponent,
    InventoryInfoTableComponent,

    ColorPipe,
    StatsSkillPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TaigaModule,
    AngularEditorModule,
  ],
  exports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TaigaModule,
    AngularEditorModule,

    WorldsComponent,
    WikiHomeComponent,
    OpenImageDialogComponent,
    SkillInfoTableComponent,
    InventoryInfoTableComponent,

    ColorPipe,
    StatsSkillPipe,
  ],
})
export class SharedModule {}
