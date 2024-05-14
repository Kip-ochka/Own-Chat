export type ValidatorInput = {
  elementId: string;
  regexp: string;
  className: string;
};

export type ValidationResult = {
  inputId: string;
  inputValue: string;
  valid: boolean;
  className: string;
};

export const REGEXPS = {
  LOGIN: "^(?=.{3,20}$)([a-zA-Z0-9_-]*[a-zA-Z_-][a-zA-Z0-9_-]*)$",
  PASSWORD: "^(?=.*?[A-ZА-ЯЁ])(?=.*?[0-9]).{8,40}$",
  EMAIL: "^[a-zA-Z0-9_-]+@[a-zA-Z]+.[a-zA-Z]+$",
  NAME: "^[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ]+$",
  PHONE: "^\\+?\\d{10,15}$",
  NICKNAME: "^.*\\S{3,}.*$",
  MESSAGE: "^.*\\S.*$",
} as const;

export const validateInput = (
  elementId: string,
  regexp: RegExp | string,
  className: string
): ValidationResult => {
  const input = document.getElementById(elementId) as HTMLInputElement;
  const valid = new RegExp(regexp).test(input.value);

  if (valid) {
    input.classList.remove(className);
  } else {
    input.classList.add(className);
  }

  return {
    valid,
    inputId: input.id,
    inputValue: input.value,
    className,
  };
};
export const validateInputs = (...items: ValidatorInput[]) => {
  const inputsValidationResults = items.map((item) =>
    validateInput(item.elementId, item.regexp, item.className)
  );

  return {
    result: inputsValidationResults.every((item) => item.valid),
    data: inputsValidationResults.reduce(
      (acc, cur) => Object.assign(acc, { [cur.inputId]: cur.inputValue }),
      {} as { [key: ValidationResult["inputId"]]: string }
    ),
  };
};
