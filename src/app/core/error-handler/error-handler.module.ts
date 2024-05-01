import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiExpandModule, TuiSvgModule } from '@taiga-ui/core';
import { ErrorDialogComponent } from './error-dialog.component';
import { GlobalErrorHandler } from './global-error-handler';

@NgModule({
  declarations: [ErrorDialogComponent],
  imports: [CommonModule, TuiButtonModule, TuiExpandModule, TuiSvgModule],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler }],
})
export class ErrorHandlerModule {}
