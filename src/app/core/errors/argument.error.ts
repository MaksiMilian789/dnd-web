/**
 * Эта ошибка выбрасывается, если один из передаваемых методу аргументов является недопустимым.
 */
export class ArgumentError extends Error {
  readonly paramName?: string;

  constructor(message: string, paramName?: string) {
    super(message);
    this.paramName = paramName;
  }
}

/**
 * Эта ошибка выбрасывается, если один из передаваемых методу аргументов является null.
 */
export class ArgumentNullError extends ArgumentError {
  constructor(paramName: string) {
    super(`Value can not be null. Parameter name: ${paramName}`, paramName);
  }
}

/**
 * Ошибка, которая выбрасывается, если значение аргумента не соответствует допустимому диапазону значений, установленному вызванным методом.
 */
export class ArgumentOutOfRangeError extends ArgumentError {
  constructor(paramName: string) {
    super(`Value out of range. Parameter name: ${paramName}`, paramName);
  }
}
