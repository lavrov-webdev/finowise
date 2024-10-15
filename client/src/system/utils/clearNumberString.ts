export const clearNumberString = (value: string) =>
  value.replaceAll(/[^0-9-]/gi, "");
