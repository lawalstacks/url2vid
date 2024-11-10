// modules/scraper.js
import axios from 'axios';

/**
 * Scrapes web content from the provided URL.
 * @param {string} url - The URL to scrape content from.
 * @returns {Promise<string>} - The scraped content.
 */
export async function scrapeContent(url) {
        const options = {
            method: 'GET',
            url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
            params: {
                url: `${url}`,
                lang: 'en',
                engine: '2'
            },
            headers: {
                'x-rapidapi-key': '5a1cbf8e89msh0bed56840d2c0b7p16aba8jsn5c2392054923',
                'x-rapidapi-host': 'article-extractor-and-summarizer.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            return response.data.summary
        } catch (error) {
            console.error(error);
        console.error('Error scraping content:', error);
    }
}
