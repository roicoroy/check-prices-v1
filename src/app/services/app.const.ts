import { Directory } from "@capacitor/filesystem";

export const FILE = 'file';

export const FILE_INFO = 'info';

export const ESTOQUE = 'estoque';

export const ESTOQUE_JSON = 'estoqueJson';

export const PRICE_LIST = 'priceList';

export const FIREBIRD_PRICE_LIST = 'priceList';

export const DIRECTORY_DOCUMENTS = Directory.Documents;
export const FOLDER_NAME = '/';

export interface ExcelData {
  // CODIGO: any;
  // Name: any;
  // Email: any;
  // Mobile: any;
  [index: number]: {
    CODIGO: string;
    EAN13: string;
    DESCRICAO: string;
    PRECO_VENDA: string;
  };
}

export interface IProduct {
  CODIGO?: string;
  EAN13?: string;
  DESCRICAO?: string;
  PRECO_VENDA?: any;
  QUANTIDADE?: string;
  MARCA?: string;
}
