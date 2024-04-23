import { NgModule } from '@angular/core';
import { TuiElementModule } from '@taiga-ui/cdk';
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
  TuiErrorModule,
} from '@taiga-ui/core';
import {
  TuiDataListDropdownManagerModule,
  TuiInputDateTimeModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiIslandModule,
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
    TuiIslandModule,
    TuiErrorModule,    
    TuiElementModule,
  ],
})
export class TaigaModule {}
