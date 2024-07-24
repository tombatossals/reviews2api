import React from "react";
import { Product } from "../../types";
import Link from "next/link";
import Image from "next/image";

const truncateText = (text: string) => {
  const maxLength = 50;
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const Card = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/`}
      className="group relative block flex flex-col justify-end bg-gray-50 hover:bg-gray-200 rounded-tr-3xl rounded-b-lg border border-gray-300"
    >
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className="-ml-3 -mt-3 transition-all group-hover:-ml-2 h-80 w-full rounded-bl-3xl rounded-tr-3xl border border-gray-300 object-cover"
      />

      <div className="p-4 text-center">
        <p className="mt-2 text-pretty text-gray-700 h-12 flex items-center">
          {truncateText(product.title)}
        </p>

        <span className="mt-4 block rounded-md bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors group-hover:text-gray-200 group-hover:bg-indigo-800">
          {product.num_reviews} reseñas
        </span>
      </div>
    </Link>
  );
};

export default Card;
