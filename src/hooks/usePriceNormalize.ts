export const usePriceNormalize = (price: number, discount: number) => {
  const totalPrice = (price - discount).toLocaleString("ru");
  return { totalPrice };
};
