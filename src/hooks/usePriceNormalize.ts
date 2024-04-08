// На случай, если вместо размера скидки захотят писать новую стоимость с учетом скидки
// const totalPrice = (discount > 0 ? discount : price).toLocaleString("ru");
// const discountPercentage = (((price - discount) / price) * 100).toFixed(2);

export const usePriceNormalize = (price: number, discount: number = 0) => {
  const totalPrice = (price - discount).toLocaleString("ru");
  const discountPercentage = ((discount / price) * 100).toFixed(2);
  return { totalPrice, discountPercentage };
};
