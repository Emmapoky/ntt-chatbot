const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { URL } = require('url');

const visitedUrls = new Set();
const baseUrl = 'https://www.nttdata.com/global/en/';
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Function to check if the URL points to a non-HTML content
function isHtmlContentType(contentType) {
    return contentType && contentType.includes('text/html');
}

async function extractTextFromUrl(url) {
    try {
        visitedUrls.add(url);
        const response = await axios.get(url);
        
        // Check the content type of the response
        const contentType = response.headers['content-type'];
        if (!isHtmlContentType(contentType)) {
            console.log(`Skipping non-HTML content: ${url}`);
            return ''; // Skip non-HTML content
        }

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
                await delay(500); // Add delay between requests
            }
        }

        return pageText;
    } catch (error) {
        console.error(`Error visiting ${url}:`, error.message);
        return ''; // Return empty string on error to continue processing
    }
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
