import path from "path";
import fs from "fs-extra";
import {genImage} from "../helpers/imageGen.js";


export async function generateImage(parts,dirPath) {
    try{
    const imagePrompts = parts.map((part, i) => `${part}`);
    const imagePaths = [];

    for (let i = 0; i < imagePrompts.length; i++) {
        console.log("working..")
        const arrayBuffer = await genImage(`${imagePrompts[i]}`)
        const buffer = Buffer.from(arrayBuffer,'base64');
        const imagePath = path.join(dirPath, `image${i + 1}.png`);
        await fs.writeFile(imagePath, buffer)
        imagePaths.push(imagePath);
        console.log(imagePath);
    }
    return imagePaths;
}catch(e){
        console.log(e)
    }
}