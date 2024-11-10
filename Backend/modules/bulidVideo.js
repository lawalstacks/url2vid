import fs from 'fs'
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from "ffmpeg-static";
import {waitForFile} from "../helpers/waitFile.js";
import path from 'path'


export const buildVideo = async(builder)=> {
    try {

        const id = `${builder}`, dir = id;
        /*await fs.renameSync(dir + '/image1.png', dir + '/1.png');
        await fs.renameSync(dir + '/image2.png', dir + '/2.png');
        await fs.renameSync(dir + '/image3.png', dir + '/3.png');
        await fs.renameSync(dir + '/part1.txt', dir + '/1.txt');
        await fs.renameSync(dir + '/part2.txt', dir + '/2.txt');
        await fs.renameSync(dir + '/part3.txt', dir + '/3.txt');
        await fs.renameSync(dir + '/audio1.mp3', dir + '/1.mp3');
        await fs.renameSync(dir + '/audio2.mp3', dir + '/1.mp3');
        await fs.renameSync(dir + '/audio3.mp3', dir + '/1.mp3');
         */
       /* await fs.renameSync(dir + '/transcription1.txt', dir + '/transcription-1.json');
        await  fs.renameSync(dir + '/transcription2.txt', dir + '/transcription-2.json');
        await fs.renameSync(dir + '/transcription3.txt', dir + '/transcription-3.json');  */
        const images = ['image1.png', 'image2.png', 'image3.png'];
        const audio = ['audio1.mp3', 'audio2.mp3', 'audio3.mp3'];
        const transcription = [
            'transcription1.json',
            'transcription2.json',
            'transcription3.json'
        ]

        for (let i = 0; i < images.length; i++) {
            console.log("working,,,")
            const inputImage = path.join(dir, images[i]);
            const inputAudio = path.join(dir, audio[i]);
            const inputTranscription = path.join(dir, transcription[i]);
            const outputVideo = path.join(dir, `output_${i}.mp4`);
            console.log(inputImage);

            //read the transcription file
            const transcriptions = JSON.parse(fs.readFileSync(inputTranscription, 'utf8'));
            const words = transcriptions.words;
            const duration = transcriptions.audio_duration;

            //Build the drawtext filer string
            let drawtextFilter = '';

            words.forEach(wordInfo => {
                const word = wordInfo.text.replace(/'/g, "\\'").replace(/"/g, '\\"');
                const start = parseFloat(wordInfo.start).toFixed(2);
                const end = parseFloat(wordInfo.end).toFixed(2);
                drawtextFilter += `drawtext=text='${word}:fontcolor=white:fontsize=96:border=4:bordercolor=black:x=(w-text_w)/2:y=(h*3/4)-text_h:enable='between(t\\,${start}\\,${end}',`;
            });

            drawtextFilter = drawtextFilter.slice(0, -1);
            console.log(`processing: ${inputImage} and ${inputAudio}`);

           /* await new Promise((resolve, reject)=>
            {
                ffmpeg()
                    .input(inputImage)
                    .loop(duration)
                    .input(inputAudio)
                    .audioCodec('copy')
                    .videoFilter(drawtextFilter)
                    .outputOptions('-t', duration)
                    .on('error', reject)
                    .on('end', resolve)
                    .save(outputVideo);
            })     */
        }
        return done;
    } catch (e) {
        console.log(e)
    }
}

//buildAudio();