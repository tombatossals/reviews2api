interface Product {
  asin: string;
  title: string;
  image: string;
  url: string;
  reviews: number;
  stars: number;
}

interface Products {
  products: Product[];
}

const HomePage = async () => {
  const res = await fetch(process.env.PRODUCTS_URL);
  const data: Products = await res.json();

  return (
    <div>
      <h1>Datos JSON</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
