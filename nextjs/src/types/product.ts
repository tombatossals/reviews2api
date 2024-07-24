export interface Product {
    asin: string;
    title: string;
    image: string;
    url: string;
    num_reviews: number;
    stars: number;
}

export interface Products {
    products: Product[];
}
