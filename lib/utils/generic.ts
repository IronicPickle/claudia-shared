import { accepts } from "https://deno.land/std@0.193.0/http/negotiation.ts";
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
