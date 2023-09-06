import { Injectable, inject } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private alertCtrl = inject(AlertController);

  async presentAlert(content?: any) {
    const alert = await this.alertCtrl.create({ message: content })
    return await alert.present();
  }  
}
