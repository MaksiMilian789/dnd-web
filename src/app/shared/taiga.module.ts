import { NgModule } from '@angular/core';
import {
  TuiScrollbarModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiButtonModule,
  TuiTextfieldControllerModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiGroupModule,
  TuiHintModule,
} from '@taiga-ui/core';
import {
  TuiDataListDropdownManagerModule,
  TuiInputDateTimeModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiSelectModule,
} from '@taiga-ui/kit';

@NgModule({
  exports: [
    TuiScrollbarModule,
    TuiLoaderModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiInputModule,
    TuiInputFilesModule,
    TuiInputNumberModule,
    TuiDataListModule,
    TuiTextfieldControllerModule,
    TuiSelectModule,
    TuiDropdownModule,
    TuiDataListDropdownManagerModule,
    TuiInputDateTimeModule,
    TuiGroupModule,
    TuiHintModule,
  ],
})
export class TaigaModule {}
