import Card from "./components/card";
import { Product, Products } from "../types";

const HomePage = async () => {
  const res = await fetch(process.env.PRODUCTS_URL);
  let products: Product[] = [];
  console.log(res);
  if (res.headers.get("content-type") == "application/json; charset=UTF-8") {
    const data: Products = await res.json();
    products = data.products;
  }

  return (
    <div className="m-8">
      <h1 className="mb-16 mx-0 px-0 text-4xl font-bold">
        Awesome Amazon Products
      </h1>
      <div className="grid grid-cols-3 gap-16 mx-12">
        {products.map((product: Product) => (
          <Card key={product.asin} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
