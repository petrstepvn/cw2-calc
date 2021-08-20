export const thousandSeparator = (number: number): string => {
  return number.toLocaleString('en-GB').replace(/,/g, ' ');
};

export const formatNumber = (
  number: number,
  separator: string = ' ',
  decimalPlaces: number = 0
): string => {
  const numberWithOptionalDecimals = Number(number.toFixed(decimalPlaces));
  return numberWithOptionalDecimals.toLocaleString('en-GB').replace(/,/g, separator);
};
