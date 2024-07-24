import React from "react";
import { Product } from "../../types";
import Link from "next/link";
import Image from "next/image";
const Card = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/`}
      className="relative block rounded-tr-3xl border border-gray-100"
    >
      <span className="absolute -right-px -top-px rounded-bl-3xl rounded-tr-3xl bg-rose-600 px-6 py-4 font-medium uppercase tracking-widest text-white">
        {product.stars} Stars
      </span>

      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
        className="-ml-6 -mt-6 h-80 w-full rounded-bl-3xl rounded-tr-3xl border border-gray-300 object-cover"
      />

      <div className="p-4 text-center">
        <p className="mt-2 text-pretty text-gray-700">{product.title}</p>

        <span className="mt-4 block rounded-md border border-indigo-900 bg-indigo-900 px-5 py-3 text-sm font-medium uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-indigo-900">
          Learn More
        </span>
      </div>
    </Link>
  );
};

export default Card;
