import fs from 'fs/promises';
import { OpenAI } from 'openai';
import path from 'path';
import { constants } from 'fs';

// Asegúrate de configurar tu API key de OpenAI
const openai = new OpenAI({
    apiKey: ""
});

interface JSONData {
    content: string;
    [key: string]: any;
}

async function fileExists(codigoASIN: string): Promise<boolean> {
    try {
        console.log('../nextjs/public/api/products/' + codigoASIN + '.json')
        await fs.access('../nextjs/public/api/products/' + codigoASIN + '.json', constants.F_OK);
        return true;
    } catch {
        return false;
    }
}

async function translateJSON(codigoASIN: string): Promise<void> {
    const exists = await fileExists(codigoASIN);

    const f = '../nextjs/public/api/products/' + codigoASIN + '.json'
    if (!exists) {
        console.error('El archivo no existe.');
        process.exit(1);
    }
    try {
        // Leer el archivo JSON
        const data = await fs.readFile(f, 'utf8');
        const jsonData: JSONData = JSON.parse(data);
        const newJson = Object.assign({}, jsonData);

        const reviews = jsonData.reviews.map(r => ({ review: r.review, embeddings: [] }));

        for (let i = 0; i < jsonData.reviews.length; i++) {
            const r = jsonData.reviews[i];
            // Traducir el contenido de la review
            const translationResponse = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Eres un traductor. Si el texto que te paso no, está en castellano, traduce el texto al castellano. Si ya está en castellano, devuelve el texto sin modificarlo." },
                    { role: "user", content: r.review }
                ],
            });

            // Obtener la traducción
            const translatedContent = translationResponse.choices[0].message.content;

            const embedding = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: r.review,
                encoding_format: "float",
            });

            newJson.reviews[i].embeddings = embedding.data[0].embedding;
            newJson.reviews[i].review_es = translatedContent;
        }

        // Guardar el archivo traducido
        const outputPath = path.join(path.dirname(f), `${path.basename(f, '.json')}_translated.json`);
        await fs.writeFile(outputPath, JSON.stringify(newJson, null, 2));

        console.log(`Traducción completada. Archivo guardado en: ${outputPath}`);
    } catch (error) {
        console.error('Error:', error instanceof Error ? error.message : String(error));
    }
}

// Obtener la ruta del archivo desde los argumentos de línea de comandos
const codigoASIN = process.argv[2];

if (!codigoASIN) {
    console.error('Por favor, proporciona la ruta del archivo JSON como argumento.');
    process.exit(1);
}

translateJSON(codigoASIN);
