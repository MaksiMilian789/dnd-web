export enum Colors {
  none = 0,
  red,
  green,
  yellow,
}

export const COLORS_LOCALIZATION: Record<Colors, string> = {
  [Colors.none]: 'Нет',
  [Colors.red]: 'Красный',
  [Colors.green]: 'Зелёный',
  [Colors.yellow]: 'Жёлтый',
};
