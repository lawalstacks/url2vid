import axios from 'axios';
import fs from 'fs';


//function to download the audio file

export const downloadAudio = async (audioUrl,outputFilePath)=>{
try {
    const response = await axios({
        timeout: 1000000,
        url: audioUrl,
        responseType: 'stream'
    });

    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(outputFilePath);
        response.data.pipe(writer);
        writer.on('finish', () => {
            resolve(outputFilePath)
        });
        writer.on('error', (error) => reject(`Error writing audio file: ${error.message}`));
    })

}catch (e) {
    console.log(e)
}

};

