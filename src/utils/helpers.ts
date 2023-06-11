import { Product, ProductKeys, SingleProduct } from "./types";

export const formatPrice: (number: number) => string = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues: (
  data: Product[],
  type: ProductKeys
) => SingleProduct[ProductKeys][] = (data, type) => {
  let values = data.map((item) => item[type]);

  if (type === "colors") {
    values = values.flat();
  }

  return ["all", ...new Set(values)];
};
