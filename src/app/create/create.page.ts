import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import { FileSystemService } from '../services/file-system.service';
import { StorageService } from '../services/storage.service';
import { EXCEL_EXTENSION, EXCEL_TYPE } from '../services/app.const';
import { WriteFileResult } from '@capacitor/filesystem';
import * as uuid from 'uuid';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {
  private fsService = inject(FileSystemService);

  authForm: FormGroup;

  productForm: FormGroup;

  mockData = {
    CODIGO: '123',
    EAN13: '123',
    NAME: 'blah',
    PRECO_VENDA: '1.00',
  };

  data: any = [];

  files: any = [];

  constructor(
    private storageService: StorageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    // this.authForm = this.formBuilder.group({
    //   diagnostic: [''],
    //   produit: [''],
    //   pieces: this.formBuilder.array([]),
    //   ramassage: '',
    //   main: '',
    // });
    this.productForm = this.formBuilder.group({
      products: this.formBuilder.array([]),
    });
  }

  async ngOnInit() {
    this.addProduct();
    await this.loadDirectory();
  }

  async loadDirectory() {
    this.files = await this.fsService.readDirectory();
  }

  async onSubmitForm() {
    console.log(this.productForm.get('products')?.value);
    const generatedId = uuid.v4();
    const excelBlob = await this.exportAsExcelFile(
      this.productForm.get('products')?.value
    );
    console.log(excelBlob);
    // const file = await this.storageService.blobToFile(excelBlob);
    // const file = {
    //   name: `${generatedId}.xlsx`,
    //   data: excelBlob,
    // };
    // console.log(file);
    const fileResponse: WriteFileResult = await this.fsService.writeFile(
      excelBlob
    );
    // console.log('excelBlob', fileResponse);

    await this.loadDirectory();
  }

  async viewFile(f?: any) {
    console.log(f);
  }

  addProduct(): void {
    const piece = this.formBuilder.group({
      CODIGO: '',
      NAME: '',
      PRECO_VENDA: '',
    });
    this.getArray.push(piece);
    // console.log('After Add: ', this.authForm.value);
  }

  deletePiece(i: any) {
    this.getArray.removeAt(i);
  }

  get getArray(): FormArray {
    return (<FormArray>this.productForm.get('products')) as FormArray;
  }

  get getArrayValues() {
    return <FormArray>this.productForm.controls['products'];
  }

  async deleteFromDocuments(file: any) {
    await this.fsService.deleteFile(file.uri);
    await this.loadDirectory();
  }

  home() {
    this.router.navigateByUrl('home');
  }

  exportAsXLSX(): void {
    this.exportAsExcelFile(this.data);
  }

  public async exportAsExcelFile(json: any[]) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet', worksheet);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data'],
    };
    // console.log(workbook);
    const excelBuffer: any = await XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'base64',
    });
    // console.log(excelBuffer);
    const generatedId = uuid.v4();
    // console.log(excelBufferBase64);
    return await this.convertBlobToExcelFile(excelBuffer, generatedId);
  }

  private async saveAsExcelFile(buffer: any, fileName: string) {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    // FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    return data;
  }

  private async convertBlobToExcelFile(buffer: any, fileName: string) {
    const blob = new Blob([buffer], { type: 'application/vnd.ms.excel' });
    console.log(blob);

    const file = new File([blob], fileName + '.xlsx', {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    console.log(file);

    const saveFile = {
      data: buffer,
      modifiedAt: new Date(),
      name:   file.name,
      size: file.size,
    };

    return saveFile;
  }
}
