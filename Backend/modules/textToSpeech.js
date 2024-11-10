import axios from 'axios';
import {downloadAudio} from "../helpers/urlToAudio.js";
import path from "path";
import fs from "fs-extra";
import {transcribeAudio} from "../helpers/transcribe.js";


export async function generateTextSpeech(parts,savePath) {
    try {
        const audioPrompts = parts.map((part, index) => `${part}`);
        const audioPaths = [];
        const transcribePaths = [];

        for (let i = 0; i < audioPrompts.length; i++) {
            console.log("working")
            console.log(audioPrompts[i]);

            const url = 'https://api.v7.unrealspeech.com/speech';
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: 'Bearer bApv7NbCoeed76nuY5uba8AtUqoBRWVrHY7GSVfjvkz9kvG0eHjbI4'
                },
                body: JSON.stringify({
                    Text: `${audioPrompts[i]}`,
                    VoiceId: 'Dan',
                    Bitrate: '192k',
                    Speed: '0',
                    Pitch: '1',
                    TimestampType: 'sentence'
                })
            };


            fetch(url, options)
                .then(res => res.json())
                .then(async json => {
                     const audioFile = json.OutputUri;
                    console.log(audioFile);
                    const audioPath = path.join(savePath, `audio${i + 1}.mp3`);
                    const audio = await downloadAudio(`${audioFile}`, audioPath);
                    audioPaths.push(audio);

                    //Transcribe to text
                    const transcription = await transcribeAudio(`${audioFile}`);
                    const transcribePath = path.join(savePath, `transcription${i + 1}.json`);
                    await fs.writeFile(transcribePath, JSON.stringify(transcription));
                    transcribePaths.push(transcribePath);
                    console.log(transcribePath);
                })
                .catch(err => console.error('error:' + err));
            //Generate text to speech and save
        }
        return{
            audioList: audioPaths,
            transcriptionList: transcribePaths
        }
    }catch (e) {
        console.log(e)
    }
}