// modules/fileManager.js
import fs from 'fs-extra';
import path from 'path';
import uniqid from 'uniqid';

// Base directory where all stories are saved
const storiesDir = path.join(process.cwd(), 'stories');

/**
 * Ensures that the main stories directory exists.
 */
export function ensureStoriesDirectory() {
    fs.ensureDirSync(storiesDir);
}

/**
 * Creates a unique directory to store story parts.
 * @returns {string} - The path to the unique directory.
 */
export function createUniqueStoryDirectory() {
    const uniqueId = uniqid();
    const dirPath = path.join(storiesDir, uniqueId);
    fs.ensureDirSync(dirPath);
    return dirPath;
}

/**
 * Saves parts of the story to individual files in the directory.
 * @param {string[]} textParts - Array of story parts.
 * @param {string} dirPath - Directory to save files in.
 * @returns {string[]} - Array of file paths.
 */
export async function saveStoryParts(textParts, dirPath) {
    const filePaths = textParts.map((_, index) => path.join(dirPath, `part${index + 1}.txt`));

    for (let i = 0; i < textParts.length; i++) {
        await fs.writeFile(filePaths[i], textParts[i]);
    }
    return filePaths;
}
