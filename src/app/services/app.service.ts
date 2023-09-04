import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Device, DeviceInfo } from '@capacitor/device';
import { IProduct } from './app.const';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  
  constructor() {}
  
  async sanitizeJsonData(json: IProduct[]) {
    let cleanArray: IProduct[] = [];
    json.forEach((product: IProduct) => {
      const str: any = product?.PRECO_VENDA?.toString();
      let formattedNumber;
      if (str.includes(',')) {
        formattedNumber = parseFloat(str?.split(',').join('.'));
      } else {
        formattedNumber = str;
      }
      const data = {
        CODIGO: product?.CODIGO,
        EAN13: product?.EAN13,
        DESCRICAO: product?.DESCRICAO,
        PRECO_VENDA: formattedNumber,
        QUANTIDADE: product?.QUANTIDADE,
        MARCA: product?.MARCA,
      };
      cleanArray.push(data);
    });
    return cleanArray;
  }
}
