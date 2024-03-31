import { urlPathRegex } from "../constants/generic.ts";
import { SortDirection } from "../enums/generic.ts";
import Validator from "../objects/Validator.ts";
import { ValidationErrors } from "../ts/api/generic.ts";

export const randomNum = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const sleep = async (ms: number) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

export const isNumber = (value: any): value is number =>
  typeof value === "number" && !isNaN(value);
export const isString = (value: any): value is string =>
  typeof value === "string";
export const isBoolean = (value: any): value is boolean =>
  typeof value === "boolean";

export const enumContains = <T>(enumType: any, value: T): value is T => {
  return Object.values(enumType).includes(value);
};

export const parseValidators = <K extends string | number | symbol>(
  validators: Record<K, Validator>
): ValidationErrors<K> => {
  let failed = false;
  const errors = {} as Record<K, string[]>;

  for (const i in validators) {
    const validator = validators[i];

    errors[i] = validator.getErrors();
    if (errors[i].length > 0) failed = true;
  }

  return { failed, ...errors };
};

export const extractPathFromUrl = (url: string) =>
  Array.from(url.matchAll(urlPathRegex))[0][1];

export const isValidDate = (date: Date) => date.toString() !== "Invalid Date";

export const sort = (sortDirection: SortDirection) => (a: any, b: any) => {
  const aDate = new Date(a);
  const bDate = new Date(b);

  if (isValidDate(aDate) && isValidDate(bDate)) {
    return sortDirection === SortDirection.Ascending
      ? aDate.getTime() - bDate.getTime()
      : bDate.getTime() - aDate.getTime();
  }

  if (isString(a) && isString(b)) {
    return sortDirection === SortDirection.Ascending
      ? a.localeCompare(b)
      : b.localeCompare(a);
  }
  if (isNumber(a) && isNumber(b)) {
    return sortDirection === SortDirection.Ascending ? a - b : b - a;
  }
  if (isBoolean(a) && isBoolean(b)) {
    return sortDirection === SortDirection.Ascending ? +a - +b : +b - +a;
  }

  return 0;
};
