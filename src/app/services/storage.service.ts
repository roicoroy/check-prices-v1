import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Device, DeviceInfo } from '@capacitor/device';
import * as uuid from 'uuid';

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
  addFile(item: any): Promise<File> {
    return this.storage.get(SAVED_FILES).then((items: any[]) => {
      if (items) {
        items.push(item);
        return this.storage.set(SAVED_FILES, items);
      } else {
        return this.storage.set(SAVED_FILES, [item]);
      }
    });
  }

  // Read
  getFiles(): Promise<File[]> {
    return this.storage.get(SAVED_FILES);
  }

  getFile(fileName: string, size: number): Promise<File> {
    return this.storage.get(SAVED_FILES).then((savedItems: File[]) => {
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
  async deleteFile(file: File, index: number): Promise<File[]> {
    return this.storage.get(SAVED_FILES).then(async (savedItems: File[]) => {
      if (!savedItems || savedItems.length === 0) {
        return null;
      }
      const itemsToKeep: File[] = [];
      // console.log(file.name);
      savedItems.forEach((item, i) => {
        // console.log(item.name, i );
        if (item.name !== file.name && i != index) {
          itemsToKeep.push(item);
          console.log(item.name);
        }
      });
      // return itemsToKeep;
      return await this.storage.set(SAVED_FILES, itemsToKeep);
    });
  }

  async blobToFile(blob: Blob): Promise<File> {
    const generatedId = uuid.v4();
    const resBlob = new Blob([blob], { type: 'application/pdf' });
    const file = new File([resBlob], `pdf-file-${generatedId}`, {
      type: blob.type,
    });
    return file;
  }

  async fileToBlob(file: File): Promise<Blob> {
    const blob = new Blob([file], { type: file.type });
    return blob;
  }
}

const SAVED_FILES = 'saved_files';
export const NAVIGATE_FILE = 'navigate_file';
