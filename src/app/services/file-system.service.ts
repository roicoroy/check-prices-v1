import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  
  async requestPermission() {
    await Filesystem.requestPermissions();
  }

  async writeFile(path: string, data: File) {
    await Filesystem.writeFile({
      path,
      data,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  }

  async readFile(path: string) {

    console.log([path]);

    const contents = await Filesystem.readFile({
      path,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    console.log('readFile::::', contents);
    return contents;
  }

  async delettFile(path: string) {
    await Filesystem.deleteFile({
      path,
      directory: Directory.Documents,
    });
  }

  async readFilePath(path: string) {
    // Here's an example of reading a file with a full file path. Use this to
    // read binary data (base64 encoded) from plugins that return File URIs, such as
    // the Camera.
    const contents = await Filesystem.readFile({
      path,
    });

    console.log('data:', contents);
    return contents;
  }
}
