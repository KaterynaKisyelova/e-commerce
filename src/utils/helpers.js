export const formatPrice = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
};

export const getUniqueValues = (data, type) => {
  let values = data.map((item) => item[type]);

  if (type === "colors") {
    values = values.flat();
  }

  return ["all", ...new Set(values)];
};
