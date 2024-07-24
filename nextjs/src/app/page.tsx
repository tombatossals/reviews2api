import Card from "./components/card";
import { Product, Products } from "../types";

const HomePage = async () => {
  const res = await fetch(process.env.PRODUCTS_URL);
  let products: Product[] = [];
  if (res.headers.get("content-type")?.search("application/json") !== -1) {
    const data: Products = await res.json();
    products = data.products;
  }

  return (
    <div className="mx-12">
      <pre className="bg-yellow-100 p-4 mb-8">
        API: curl https://reviews.micronautas.com/api/products.json
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
