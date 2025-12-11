export const formatCurrency = (price: number) => {
  return new Intl.NumberFormat("pt-Br", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};
