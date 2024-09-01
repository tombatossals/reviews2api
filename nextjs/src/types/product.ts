export interface Review {
    title: string;
    title_es: string;
    stars: string;
    date: string;
    country: string;
    name: string;
    review: string;
    review_es: string;
}

export interface Product {
    asin: string;
    title: string;
    image: string;
    url: string;
    num_reviews: number;
    reviews: Review[] | null;
    stars: number;
}

export interface Products {
    products: Product[];
}
