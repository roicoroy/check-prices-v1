import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Filesystem, WriteFileResult } from '@capacitor/filesystem';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { StorageService } from '../services/storage.service';
import { AppService } from '../services/app.service';
import { IFile } from '../services/app.const';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import { FileSystemService } from '../services/file-system.service';
import { AlertService } from '../services/alert.service';
import { AlertController } from '@ionic/angular';
import * as JSZip from 'JSZip';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
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

  private alertController = inject(AlertController);

  files: any = [];

  iconStatus = true;

  fileUploadedDate: Date = new Date('12/12/2022');

  todayDate: Date = new Date();

  loading: any;

  filePath: string = '';

  public copyToAppDirectory: boolean = false;

  constructor(
    public storageService: StorageService,
    public appService: AppService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadDirectory();
  }

  async loadDirectory() {
    this.files = await this.fsService.readDirectory();
  }

  async viewFile(f: IFile) {
    const file_uri = this.fsService.getUri(f.name);
    if (!file_uri) {
      return;
    }
    await FileOpener.openFile({ path: (await file_uri).uri });
  }

  public async pickFile(): Promise<WriteFileResult> {
    await Filesystem.requestPermissions();

    const { files } = await FilePicker.pickFiles({
      readData: true,
    });

    const file: any = files[0];
    console.log(file);

    const fileResponse: WriteFileResult = await this.fsService.writeFile(file);

    await this.loadDirectory();

    return fileResponse;
  }

  async onChangeFile(event: any) {
    //const input = event.target;
    const input: DataTransfer = event.target as DataTransfer;
    const uploadedFile = input.files[0];

    if (!uploadedFile) return;

    try {
      const zip = await JSZip.loadAsync(uploadedFile);
      const isxlsxFile = (name: any) => name.toLowerCase().endsWith('.xlsx');
      const fileInZip = Object.keys(zip.files);
      const firstxlsxFile = fileInZip.find(isxlsxFile);
      if (!firstxlsxFile) return window.alert('NO Excel file found');
      const xlsxData: any = await zip.file(firstxlsxFile)?.async('blob');
      const reader: FileReader = new FileReader();
      reader.readAsBinaryString(xlsxData);
      reader.onload = (e: any) => {
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);
        console.table(data);
      };
    } catch (error) {
      alert('somthing went wrong');
      console.error(error);
    }
  }

  async deleteFromDocuments(file: IFile) {
    await this.fsService.deleteFile(file.uri);
    await this.loadDirectory();
  }

  async scanner(f: IFile) {
    await this.presentAlert(f.name, f.ctime);
  }

  async presentAlert(fileName: string, ctime: string) {
    const alertButtons = [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {},
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          const params = {
            fileName,
            ctime: ctime,
          };
          this.router.navigate([`/scanner/`, params]);
        },
      },
    ];
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      subHeader: 'If you want to use this file, press ok',
      message: fileName,
      buttons: alertButtons,
    });

    await alert.present();
  }

  create() {
    this.router.navigate([`/create/`]);
  }

  async ngOnDestroy(): Promise<void> {}
}
