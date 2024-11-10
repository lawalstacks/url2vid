import sharp from "sharp";
import axios from "axios";

export const convertImageToPng = async(imageUrl)=>{
    try{
        //Download the image from url
        const response = await axios({
            url: imageUrl,
            responseType: "arraybuffer"
        })

        //convert the image to PNG using sharp
        const imageBuffer = await sharp(response.data).png().toBuffer();
        return imageBuffer;
    }catch (e) {
        console.log(e)
    }
}