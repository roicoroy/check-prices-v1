import { Injectable } from '@angular/core';
import {
  Filesystem,
  Directory,
  Encoding,
  GetUriResult,
  WriteFileResult,
} from '@capacitor/filesystem';
import { IFile } from './app.const';

@Injectable({
  providedIn: 'root',
})
export class FileSystemService {
  async requestPermission() {
    await Filesystem.requestPermissions();
  }

  async writeFile(file: any): Promise<WriteFileResult> {
    const contents = await Filesystem.writeFile({
      data: file.data,
      path: file.name,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    return contents;
  }

  async readFilePath(path: string) {
    const contents = await Filesystem.readFile({
      path,
    });
    return contents;
  }

  async readFile(path: string) {
    console.log(path);
    const contents = await Filesystem.readFile({
      path,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });

    // console.log('readFile::::', contents);
    return contents;
  }

  async readDirectory() {
    const contents = await Filesystem.readdir({
      path: '/',
      directory: Directory.Documents,
    });
    return contents;
  }

  async deleteFile(path: string) {
    await Filesystem.deleteFile({
      path,
    });
  }

  async getUri(path: string): Promise<GetUriResult> {
    const contents = await Filesystem.getUri({
      path,
      directory: Directory.Documents,
    });
    return contents;
  }
}
