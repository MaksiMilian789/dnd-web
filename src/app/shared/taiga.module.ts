import { NgModule } from '@angular/core';
import { TuiElementModule, TuiLetModule } from '@taiga-ui/cdk';
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
  TuiCheckboxLabeledModule,
  TuiDataListDropdownManagerModule,
  TuiInputDateTimeModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiIslandModule,
  TuiSelectModule,
  TuiStepperModule,
  TuiTextareaModule,
} from '@taiga-ui/kit';

@NgModule({
  exports: [
    TuiScrollbarModule,
    TuiLoaderModule,
    TuiSvgModule,
    TuiButtonModule,
    TuiInputModule,
    TuiInputPasswordModule,
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
    TuiCheckboxLabeledModule,
    TuiStepperModule,
    TuiLetModule,
    TuiTextareaModule
  ],
})
export class TaigaModule {}
