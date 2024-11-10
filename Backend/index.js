// server.js
import express from 'express';
import * as dotenv from 'dotenv';
import { scrapeContent } from './modules/scraper.js';
import { generateStory} from './modules/geminiApi.js';
import {generateImage} from "./modules/generateImage.js";
import { ensureStoriesDirectory, createUniqueStoryDirectory, saveStoryParts } from './modules/fileManager.js';
import {generateTextSpeech} from "./modules/textToSpeech.js";
import {buildVideo} from "./modules/bulidVideo.js";

import {waitForFile} from "./helpers/waitFile.js";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.json());

// Ensure the main stories directory exists at server start
ensureStoriesDirectory();

// Route to scrape content, generate stories, and save them
app.post('/api/generate-story', async (req, res
) => {
    try {
        const { url } = req.body;

        // Step 1: Scrape content from the provided URL
        const scrapedContent = await scrapeContent(url);
        // Step 2: Generate a continuous story based on the scraped content
        const generatedText = await generateStory(scrapedContent);
        // Step 3: Split the generated story into 3 parts of at least 100 words
        const words = generatedText?.split(' ');
        const partSize = 30;
        const textParts = [
            words.slice(0, partSize).join(' '),
            words.slice(partSize, partSize * 2).join(' '),
            words.slice(partSize * 2).join(' '),
        ];
        // Step 4: Create a unique directory and save the story parts
        const dirPath = createUniqueStoryDirectory();
        const filePaths = await saveStoryParts(textParts, dirPath);
        //step 5: create image into 3 parts based on the content
        const images = await generateImage(textParts,dirPath);
        //step 6: create text to speech into 3 parts based on the content
        //const media = await generateTextSpeech(textParts,dirPath);
       // await buildVideo(dirPath);
        // Return the paths of the saved files
        res.json({
            message: 'Story generated and saved successfully',
            dirPath,
            filePaths,
            images,
            audio:media.audioList,
            transcribed: media.transcriptionList
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error generating story' });
    }
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});