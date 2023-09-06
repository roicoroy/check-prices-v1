import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Device, DeviceInfo } from '@capacitor/device';
import * as uuid from 'uuid';
import { EXCEL_TYPE, IFile, REFERENCE_OBJ, SAVED_FILES } from './app.const';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    return await this.storage.create();
  }

  async storageSet(key: any, value: any): Promise<any> {
    return await this.storage.set(key, value);
  }
  async storageGet(key: any): Promise<any> {
    return await this.storage.get(key);
  }
  async storageRemove(key: any): Promise<any> {
    return await this.storage.remove(key);
  }
  async getDeviceInfo(): Promise<DeviceInfo> {
    return Device.getInfo();
  }

  // Create
  addReferemceObj(item: any): Promise<File> {
    return this.storage.get(REFERENCE_OBJ).then((items: any[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(REFERENCE_OBJ, items);
      } else {
        return this.storage.set(REFERENCE_OBJ, [item]);
      }
    });
  }

  // // Read
  // getFiles(): Promise<File[]> {
  //   return this.storage.get(SAVED_FILES);
  // }

  async getFilesParameter(params: string): Promise<File[]> {
    return await this.storage.get(params);
  }

  getReferemceObj(fileName: string, size: number): Promise<File> {
    return this.storage.get(REFERENCE_OBJ).then((savedItems: File[]) => {
      let returnItem: any;
      savedItems.forEach((file) => {
        if (file.name == fileName && file.size == size) {
          returnItem = file;
        }
      });
      return returnItem;
    });
  }

  // Delete
  async deleteFile(file: IFile, index: number): Promise<IFile[]> {
    return this.storage.get(REFERENCE_OBJ).then(async (savedItems: IFile[]) => {
      if (!savedItems || savedItems.length === 0) {
        return null;
      }
      const itemsToKeep: IFile[] = [];
      // console.log(file.name);
      savedItems.forEach((item, i) => {
        // console.log(item.name, i );
        if (item.name !== file.name && i != index) {
          itemsToKeep.push(item);
          console.log(item.name);
        }
      });
      // return itemsToKeep;
      return await this.storage.set(REFERENCE_OBJ, itemsToKeep);
    });
  }

  async blobToFile(blob: Blob): Promise<File> {
    const generatedId = uuid.v4();
    const resBlob = new Blob([blob], { type: EXCEL_TYPE });
    const file = new File([resBlob], `excel-file-${generatedId}`, {
      type: blob.type,
    });
    return file;
  }

  async fileToBlob(data: string | Blob): Promise<Blob> {
    const blob = new Blob([data]);
    return blob;
  }
}
