import Review from "@/app/components/review";
import { Product, Review as ReviewType } from "../../../types";
import Image from "next/image";
import dayjs from "dayjs";

export const runtime = "edge";

const sortFechas = (reviews: ReviewType[] | undefined) => {
  return reviews?.sort((a, b) => {
    return dayjs(b.date).unix() - dayjs(a.date).unix();
  });
};

const HomePage = async ({ params }: { params: { asin: string } }) => {
  const res = await fetch(
    `${process.env.PUBLIC_BASE_URL}${process.env.PRODUCT_URL.replace(
      "{ASIN}",
      params.asin
    )}?timestamp=${new Date().getTime()}`
  );

  let product: Product = {} as Product;
  if (res.headers.get("content-type")?.search("application/json") !== -1) {
    product = await res.json();
  }

  if (!product) {
    return null;
  }

  return (
    <div className="mx-12">
      <pre className="bg-yellow-100 p-4 mb-4">
        <b>API</b>: {process.env.PUBLIC_BASE_URL}
        {process.env.PRODUCT_URL.replace("{ASIN}", params.asin)}
      </pre>
      <pre className="bg-yellow-100 p-4 mb-4">
        <b>URL de API privada</b>: {process.env.PUBLIC_BASE_URL}
        {process.env.PRODUCT_PRIVATE_URL.replace("{ASIN}", params.asin)}
        <br />
        <b>Token de autorización</b>: {process.env.PRODUCT_AUTH_TOKEN}
      </pre>

      <div className="w-full flex border-t border-r border-l border-grey-light">
        <div
          className="h-48 p-2 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          title="Woman holding a mug"
        >
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
          />
        </div>
        <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8 flex flex-col">
            <div className="flex items-center">
              <svg
                className="text-grey w-3 h-3 mr-2 group-hover:fill-red-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              ASIN: {product.asin}
            </div>
            <div className="text-black font-bold text-xl mb-2">
              {product.title}
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-black leading-none">
                {product.reviews?.length} comentarios
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 pt-4">
        {sortFechas(product.reviews as ReviewType[])?.map(
          (review: ReviewType, index) => (
            <Review key={index} review={review} />
          )
        )}
      </div>
    </div>
  );
};

export default HomePage;
