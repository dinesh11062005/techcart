const API_URL = "https://dummyjson.com/products?limit=0";

export async function getProducts() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();

  const electronics = data.products.filter(
    (product) =>
      product.category === "laptops" ||
      product.category === "smartphones" ||
      product.category === "tablets" ||
      product.category === "mobile-accessories" ||
      product.category === "smartwatches"
  );

  return electronics;
}