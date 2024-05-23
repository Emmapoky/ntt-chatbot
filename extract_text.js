const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { URL } = require('url');

const visitedUrls = new Set();
const baseUrl = 'https://www.nttdata.com/global/en/';

async function extractTextFromUrl(url) {
    visitedUrls.add(url);
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    let pageText = '';
    $('body *').each((index, element) => {
        const text = $(element).text().trim();
        if (text && $(element).children().length === 0) {
            pageText += text + ' ';
        }
    });

    const links = $('a[href]');
    for (let i = 0; i < links.length; i++) {
        const href = links[i].attribs.href;
        const fullUrl = new URL(href, baseUrl).href;
        if (fullUrl.startsWith(baseUrl) && !visitedUrls.has(fullUrl)) {
            console.log(`Visiting ${fullUrl}`);
            pageText += await extractTextFromUrl(fullUrl);
        }
    }

    return pageText;
}

(async () => {
    try {
        console.log('Starting text extraction...');
        const allText = await extractTextFromUrl(baseUrl);
        console.log('Writing text to file...');
        fs.writeFileSync('nttdata_text.txt', allText, 'utf-8');
        console.log('Text extraction complete. Data saved to nttdata_text.txt');
    } catch (error) {
        console.error('Error extracting text:', error);
    }
})();
