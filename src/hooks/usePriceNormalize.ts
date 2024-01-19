export const usePriceNormalize = (price: number, discount: number = 0) => {
  const totalPrice = (price - discount).toLocaleString("ru");
  return { totalPrice };
};
