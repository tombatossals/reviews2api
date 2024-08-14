import Card from "./components/card";
import { Product, Products } from "../types";

export const runtime = "edge";

const HomePage = async () => {
  const res = await fetch(
    `${process.env.PUBLIC_BASE_URL}${
      process.env.PRODUCTS_URL
    }?timestamp=${new Date().getTime()}`
  );
  let products: Product[] = [];
  if (res.headers.get("content-type")?.search("application/json") !== -1) {
    const data: Products = await res.json();
    products = data.products;
  }

  return (
    <div className="mx-12">
      <pre className="bg-yellow-100 p-4 mb-8">
        <b>API</b>: {process.env.PUBLIC_BASE_URL}
        {process.env.PRODUCTS_URL}
      </pre>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product: Product) => (
          <Card key={product.asin} product={product} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
