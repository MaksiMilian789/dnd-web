import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [SharedModule],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
