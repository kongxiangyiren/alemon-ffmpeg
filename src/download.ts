import { execSync } from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { homedir, arch } from 'os';
import { dirname, join } from 'path';
import axios from 'axios';
const AddPATH: string[] = [];
function download() {
  return new Promise(async (resolve, reject) => {
    // let ffmpeg: string | undefined;
    // try {
    //   ffmpeg = execSync('ffmpeg -version', {
    //     encoding: 'utf-8',
    //     stdio: 'ignore'
    //   });
    // } catch (error) {
    //   undefined;
    // }

    // if (!ffmpeg) {
    //   const ffmpegPath = join(
    //     homedir(),
    //     '.cache',
    //     'ffmpeg',
    //     `ffmpeg${process.platform === 'win32' ? '.exe' : ''}`
    //   );
    //   const platform =
    //     process.platform == 'android' ? 'linux' : process.platform;
    //   if (!existsSync(ffmpegPath)) {
    //     console.log('开始下载ffmpeg');
    //     mkdirSync(dirname(ffmpegPath), { recursive: true });

    //     const res = await axios
    //       .get(
    //         `https://cdn.npmmirror.com/binaries/ffmpeg-static/b6.0/ffmpeg-${platform}-${arch()}`,
    //         {
    //           responseType: 'arraybuffer'
    //         }
    //       )
    //       .catch(err => err);
    //     if (!res || !res.data) {
    //       console.error('ffmpeg 下载失败');
    //       return reject(false);
    //     }
    //     writeFileSync(ffmpegPath, res.data);
    //     ffmpeg = ffmpegPath;
    //   } else {
    //     ffmpeg = ffmpegPath;
    //   }
    //   if (platform === 'linux') {
    //     console.log('添加运行权限');
    //     execSync('chmod +x ' + ffmpegPath);
    //   }
    //   // 将ffmpeg添加到环境变量
    //   AddPATH.push(dirname(ffmpeg));
    // }

    let ffprobe: string | undefined;
    try {
      ffprobe = execSync('ffprobe -version', {
        encoding: 'utf-8',
        stdio: 'ignore'
      });
    } catch (error) {
      undefined;
    }

    if (!ffprobe) {
      const ffprobePath = join(
        homedir(),
        '.cache',
        'ffmpeg',
        `ffprobe${process.platform === 'win32' ? '.exe' : ''}`
      );
      const platform =
        process.platform == 'android' ? 'linux' : process.platform;
      if (!existsSync(ffprobePath)) {
        console.log('开始下载ffprobe');
        mkdirSync(dirname(ffprobePath), { recursive: true });

        const res = await axios
          .get(
            `https://cdn.npmmirror.com/binaries/ffmpeg-static/b6.0/ffprobe-${platform}-${arch()}`,
            {
              responseType: 'arraybuffer'
            }
          )
          .catch(err => err);
        if (!res || !res.data) {
          console.error('ffprobe 下载失败');
          return reject(false);
        }
        writeFileSync(ffprobePath, res.data);
        ffprobe = ffprobePath;
      } else {
        ffprobe = ffprobePath;
      }
      if (platform === 'linux') {
        console.log('添加运行权限');
        execSync('chmod +x ' + ffprobePath);
      }
      // 将ffprobe添加到环境变量
      AddPATH.push(dirname(ffprobe));
    }

    // 临时添加到环境变量
    const PATH = process.env.PATH as string;
    const splitUp = process.platform === 'win32' ? ';' : ':';
    process.env.PATH =
      Array.from(new Set(AddPATH)).join(splitUp) + splitUp + PATH;
    resolve(true);
  });
}

export default download;