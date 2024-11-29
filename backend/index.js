const express = require('express')
const fs = require('fs')

const app = express()

const videoFileMap={
    'construction1':'videos/construction1.mp4',
    'construction2':'videos/construction2.mp4',
    'construction3':'videos/construction3.mp4',
    'food1':'videos/food1.mp4',
    'food2':'videos/food2.mp4',
    'food3':'videos/food3.mp4',
    'technical1':'videos/technical1.mp4',
    'technical2':'videos/technical2.mp4',
    'technical3':'videos/technical3.mp4',
    'textile1':'videos/textile1.mp4',
    'textile2':'videos/textile2.mp4',
    'textile3':'videos/textile3.mp4',
    'transport1':'videos/transport1.mp4',
    'transport2':'videos/transport2.mp4',
    'transport3':'videos/transport3.mp4',}
    
    app.get('/videos/:filename', (req, res) => {
        const fileName = req.params.filename;
        const filePath = videoFileMap[fileName];
    
        if (!filePath) {
            return res.status(404).send('File not found');
        }
    
        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range;
    
        if (range) {
            const parts = range.replace(/bytes=/, '').split('-');
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    
            const chunksize = end - start + 1;
            const file = fs.createReadStream(filePath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4'
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4'
            };
            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res);
        }
    });
    
    app.listen(3000, () => {
        console.log('Server is listening on port 3000');
    });
    