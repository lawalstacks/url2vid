import { AssemblyAI } from 'assemblyai'

const client = new AssemblyAI({
    apiKey: '9eaf4a1dfd174c3081e6c75ab6319e2b'
})

// You can use a local filepath:
// const audioFile = "./example.mp3"
export const transcribeAudio=async(url)=> {
// Or use a publicly-accessible URL:
    try {
        const audioFile = `${url}`
        const params = {
            audio: audioFile
        }
        const transcript = await client.transcripts.transcribe(params)
        if (transcript.status === 'error') {
            console.error(`Transcription failed: ${transcript.error}`)
            process.exit(1)
        }

       return transcript;
    } catch (e) {
        console.log(e)
    }
}
