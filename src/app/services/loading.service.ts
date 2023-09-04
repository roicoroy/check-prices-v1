import { Injectable, inject } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Device, DeviceInfo } from '@capacitor/device';
import * as uuid from 'uuid';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingCtrl = inject(LoadingController);

  isLoading = false;

  async presentLoading(content?: any) {
    this.isLoading = true;
    return await this.loadingCtrl
      .create({ spinner: 'circles' })
      .then(
        async (loader: {
          present: () => Promise<any>;
          dismiss: () => Promise<any>;
        }) => {
          await loader.present().then((resp: any) => {
            if (!this.isLoading) {
              loader.dismiss().then(() => {});
            }
          });
        }
      );
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss();
  }
}
