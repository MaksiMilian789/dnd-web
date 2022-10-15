import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ResultDialogComponent } from './result-dialog.component';

@NgModule({
  declarations: [ResultDialogComponent],
  imports: [SharedModule],
  exports: [ResultDialogComponent],
})
export class ResultDialogModule {}
