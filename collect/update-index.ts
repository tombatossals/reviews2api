import fs from "fs"
import path from "path"

const d = path.join(__dirname, '../nextjs/public/data/products');

const products = [];

fs.readdir(d, (err, files) => {
    const f = files.filter(file => path.extname(file).toLowerCase() === '.json');
    f.forEach(file => {
        const data = JSON.parse(fs.readFileSync(path.join(d, file), 'utf8'));
        products.push({
            url: data.url,
            title: data.title,
            image: data.image,
            asin: data.asin,
            stars: data.stars,
            num_reviews: data.reviews.length
        })
    });

    fs.writeFileSync(path.join(__dirname, '../nextjs/public/data/products.json'), JSON.stringify({ products }, null, 2));
    console.log(products);
});