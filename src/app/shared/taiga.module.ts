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
  TuiPrimitiveTextfieldModule,
  TuiTooltipModule,
} from '@taiga-ui/core';
import {
  TuiCheckboxBlockModule,
  TuiCheckboxLabeledModule,
  TuiDataListDropdownManagerModule,
  TuiInputDateTimeModule,
  TuiInputFilesModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiInputPasswordModule,
  TuiInputSliderModule,
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
    TuiTextareaModule,
    TuiInputSliderModule,
    TuiTooltipModule,
    TuiCheckboxBlockModule
  ],
})
export class TaigaModule {}
