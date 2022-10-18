import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { WikiComponent } from './wiki.component';

@NgModule({
  declarations: [WikiComponent],
  imports: [SharedModule],
  exports: [WikiComponent],
})
export class WikiModule {}
