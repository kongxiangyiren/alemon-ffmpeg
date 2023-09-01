import ffmpegDownload from 'alemon-ffmpeg';
import ffmpeg from 'fluent-ffmpeg';
import { execSync } from 'child_process';
import { join } from 'path';
async function run() {
  // 下载ffmpeg
  await ffmpegDownload().catch(err=>err);
  console.log(execSync('ffmpeg -version', { encoding: 'utf-8' }));
  console.log(execSync('ffprobe -version', { encoding: 'utf-8' }));
  ffmpeg(join(__dirname, './录音.m4a'))
    .toFormat('mp3')
    .output(join(__dirname, './out.mp3'))
    .on('error', async err => {
      console.error('发生错误', err.toString());
    })
    .on('end', async () => {
      console.log('转换完成');
    })
    .run();
}
run();
