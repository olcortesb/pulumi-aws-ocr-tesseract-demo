import { Handler } from 'aws-lambda';
import { createWorker } from 'tesseract.js';
import * as path from 'path';
import * as fs from 'fs';
import { compareAsc, format } from 'date-fns'


export const handler: Handler = async (event, context) => {

    const dir = path.join('/tmp');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    const worker = createWorker({
        cachePath: path.join('/tmp'),
      });
    
    const result = await run(worker);

    format(new Date(2014, 1, 11), 'yyyy-MM-dd')

    const dates = [
        new Date(1995, 6, 2),
        new Date(1987, 1, 11),
        new Date(1989, 6, 10),
        ]
        
    console.log(dates.sort(compareAsc));

    return {
        statusCode: 200,
        body: result
    };

};

async function run(worker: any) {
    await worker.load();
    await worker.loadLanguage('eng');
    //await move_file('');
    await worker.initialize('eng');
    const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    console.log(text);
    await worker.terminate();  
    return text;
}

async function move_file(params: any) {
    fs.copyFile('./eng.traineddata', '/tmp/eng.traineddata', (err) => {
        if (err) throw err;
        console.log('source.txt was copied to destination.txt');
    });  
}