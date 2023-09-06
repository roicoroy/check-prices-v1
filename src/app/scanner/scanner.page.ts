import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FileSystemService } from '../services/file-system.service';
import { LoadingService } from '../services/loading.service';
import * as XLSX from 'xlsx';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {
  public products$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  private fsService = inject(FileSystemService);

  private loadingService = inject(LoadingService);

  savedFile: any;

  fileName: string;

  isSupported = false;

  barcodes: Barcode[] = [];

  json: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    this.route.paramMap.subscribe(async (paramMap: any) => {
      this.fileName = paramMap.get('fileName');
      const readFilePath = await this.fsService.readFile(this.fileName);
      const blob = this.b64toBlob(readFilePath.data);
      const f = await blob?.arrayBuffer();
      const wb = await XLSX.read(f);
      this.json = XLSX.utils.sheet_to_json<any>(wb.Sheets[wb.SheetNames[0]]);
      this.products$.next(this.json);
    });

    BarcodeScanner.isSupported().then((result: any) => {
      this.isSupported = result.supported;
    });
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();

    this.barcodes.push(...barcodes);

    console.log(this.barcodes[0].rawValue.toString());
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  b64toBlob = (b64Data: any, contentType = '', sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  home() {
    this.router.navigateByUrl('home');
  }
}
