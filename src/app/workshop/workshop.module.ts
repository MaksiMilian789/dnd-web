import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { WorkshopHomeComponent } from './components/workshop-home/workshop-home.component';
import { WorkshopShellComponent } from './components/workshop-shell/workshop-shell.component';

@NgModule({
  declarations: [
    WorkshopShellComponent,
    WorkshopHomeComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
  ],
})
export class WorkshopModule {}
