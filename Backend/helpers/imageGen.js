import fs from 'node:fs';
import axios from 'axios';

export const genImage = async (text)=> {
        const options = {
            method: 'POST',
            url: 'https://openjourney1.p.rapidapi.com/models/stabilityai/stable-diffusion-xl-base-1.0',
            headers: {
                'x-rapidapi-key': '5a1cbf8e89msh0bed56840d2c0b7p16aba8jsn5c2392054923',
                'x-rapidapi-host': 'openjourney1.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: {
                inputs: `${text}`
            }
        };

        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            console.error(error);
        }
}
