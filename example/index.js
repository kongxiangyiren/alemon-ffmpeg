const download = require('alemon-ffmpeg');
const ffmpeg = require('fluent-ffmpeg');
const {execSync}=require('child_process')

async function run() {
  // 下载ffmpeg
  await download();
 console.log(execSync('ffmpeg -version',{encoding:"utf-8"})); 
 console.log(execSync('ffprobe -version',{encoding:"utf-8"})); 
  ffmpeg('./录音.m4a')
    .toFormat('mp3')
    .output('./out.mp3')
    .on('error', async err => {
      console.error('发生错误', err.toString());
    })
    .on('end', async () => {
      console.log('转换完成');
    })
    .run();
}
run();
