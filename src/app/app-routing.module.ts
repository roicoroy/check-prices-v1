import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'file-opener',
    loadChildren: () =>
      import('./modules/file-opener/file-opener.module').then(
        (m) => m.FileOpenerPageModule
      ),
  },
  {
    path: 'file-picker',
    loadChildren: () =>
      import('./modules/file-picker/file-picker.module').then(
        (m) => m.FilePickerPageModule
      ),
  },
  {
    path: 'barcode-scanner',
    loadChildren: () =>
      import('./modules/barcode-scanner/barcode-scanner.module').then(
        (m) => m.BarcodeScannerPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
