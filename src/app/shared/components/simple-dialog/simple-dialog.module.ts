import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { SimpleDialogComponent } from './simple-dialog.component';

@NgModule({
  declarations: [SimpleDialogComponent],
  imports: [SharedModule],
  exports: [SimpleDialogComponent],
})
export class SimpleDialogModule {}
