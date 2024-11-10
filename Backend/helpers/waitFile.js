import fs from 'fs';
// Helper function to pause for a specified time

// Function to wait for the file to exist
export async function waitForFile(filePath, maxRetries = 10000, delayTime = 100000) {
    let retries = 0;
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    while (retries < maxRetries) {
        if (fs.existsSync(filePath)) {
            console.log('File found:', filePath);
            return true;
        }
        console.log(`File not found yet, retrying (${retries + 1}/${maxRetries})...`);
        retries++;
        // Wait for delayTime milliseconds before checking again
        delay(delayTime);
    }
    console.log(`File ${filePath} not found after ${maxRetries} retries.`);
}