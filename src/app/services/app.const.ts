import { Directory } from '@capacitor/filesystem';

export const FILE = 'file';

export const FILE_INFO = 'info';

export const ESTOQUE = 'estoque';

export const ESTOQUE_JSON = 'estoqueJson';

export const PRICE_LIST = 'priceList';

export const FIREBIRD_PRICE_LIST = 'priceList';

export const DIRECTORY_DOCUMENTS = Directory.Documents;

export const FILE_PATH = 'filePath';

export const FOLDER_NAME = '/';

export const SAVED_FILES = 'saved_files';

export const NAVIGATE_FILE = 'navigate_file';

export const REFERENCE_OBJ = 'referenceObject';

export const EXCEL_TYPE =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
export const EXCEL_EXTENSION = '.xlsx';
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

export interface IFile {
  ctime: string;
  mtime: string;
  name: string;
  size: string;
  type: string;
  uri: string;
  path?: string;
  data?: any;
}
