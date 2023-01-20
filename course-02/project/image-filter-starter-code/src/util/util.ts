import fs from "fs";
import Jimp = require("jimp");
import axios from 'axios'


export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve:Function, reject:Function) => {
    try {

  
     const {data: imageBuffer} = await axios({
        method: 'get',
        url: inputURL,
        responseType: 'arraybuffer'
      })
      const photo = await Jimp.read(imageBuffer);
   
      const outpath = "/tmp/filtered." + Math.floor(Math.random() * 2000) +'.jpg';
      
      photo
        .resize(256, 256) // resize image
        .quality(60) // set quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, (err: Error) => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(error);
    }
  });
}   
 

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files: Array<string>) {
  for (let file of files) {
    fs.unlinkSync(file);
  }
}

