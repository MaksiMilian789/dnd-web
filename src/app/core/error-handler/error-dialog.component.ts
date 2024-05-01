import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

export interface ErrorDialogData {
  message: string;
  details?: any;
}

@Component({
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent {
  protected showDetails = false;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    protected readonly context: TuiDialogContext<void, ErrorDialogData>
  ) {}

  protected get detailsAsString(): string | undefined {
    const details = this.context.data.details;
    if (details == null) {
      return undefined;
    }
    return typeof details === 'object' ? JSON.stringify(details, null, 2) : details;
  }
}
