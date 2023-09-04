import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { StorageService } from '../services/storage.service';
import { AppService } from '../services/app.service';
import { DIRECTORY_DOCUMENTS, FILE } from '../services/app.const';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import { FileSystemService } from '../services/file-system.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public plugins = [
    {
      name: 'File Opener',
      url: '/file-opener',
    },
    {
      name: 'File Picker',
      url: '/file-picker',
    },
    {
      name: 'Barcode Scanner',
      url: '/barcode-scanner',
    },
  ];

  private fsService = inject(FileSystemService);

  files: any = [];

  iconStatus = true;

  fileUploadedDate: Date = new Date('12/12/2022');

  todayDate: Date = new Date();

  loading: any;

  public copyToAppDirectory: boolean = false;

  constructor(
    public storage: StorageService,
    public appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.loadFiles();
  }

  async loadFiles() {
    const contents = await Filesystem.readFile({
      path: '/',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    console.log(contents);
  }

  async loadFile(path: string) {
    const contents = await Filesystem.readFile({
      path: `/${path}`,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    console.log(contents);
  }

  public async pickFile(): Promise<void> {
    const { files } = await FilePicker.pickFiles();
    const incomingFile = files[0];

    console.log(incomingFile);

    if (incomingFile.path) {

      await Filesystem.writeFile({
        data: incomingFile.path,
        path: `/${incomingFile.name}`,
        directory: DIRECTORY_DOCUMENTS,
      });
      const { uri } = await Filesystem.getUri({
        path: `/${incomingFile.name}`,
        directory: DIRECTORY_DOCUMENTS,
      });
    }

    // const extension = incomingFile.name.split('.').pop();
    // if (extension === 'xlsx' || extension === 'xls') {
    //   const file = await this.storage.addFile(incomingFile);
    //   this.loadFiles();
    // } else {
    //   alert('Format not acceptable');
    // }
  }

  async deleteFromStorage(file: File, i: number) {
    await this.storage.deleteFile(file, i);
    await this.loadFiles();
  }

  async delete(entry: any) {}

  async viewFile(f: File) {
    const file_uri = await Filesystem.getUri({
      path: f.name,
      directory: DIRECTORY_DOCUMENTS,
    });

    // await this.openFile(file_uri.uri);
    this.loadFile(f.name);
  }

  public async openFile(uri: string): Promise<void> {
    if (!uri) {
      return;
    }
    await FileOpener.openFile({ path: uri });
    console.log('File opened');
  }

  async clearApp() {
    await this.storage.storageRemove(FILE);
  }

  scanner(f: any) {
    const params = {
      fileName: f.name,
      size: f.size,
    };
    this.router.navigate([`/scanner/`, params]);

    // this.router.navigate(['scanner'], {
    //   queryParams: { order: 'popular', 'price-range': 'expensive' },
    // });
  }
}
