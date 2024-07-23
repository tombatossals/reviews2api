export interface Product {
    asin: string;
    title: string;
    image: string;
    url: string;
    reviews: number;
    stars: number;
}

export interface Products {
    products: Product[];
}
