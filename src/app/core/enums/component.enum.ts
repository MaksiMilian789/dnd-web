export enum ComponentEnum {
  Verbal = 0,
  Somatic,
  Material,
}

export const COMPONENT_LOCALIZATION: Record<ComponentEnum, string> = {
  [ComponentEnum.Verbal]: 'Вербальный',
  [ComponentEnum.Somatic]: 'Соматический',
  [ComponentEnum.Material]: 'Материальный',
};
