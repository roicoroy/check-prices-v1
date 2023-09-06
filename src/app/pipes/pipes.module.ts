import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ComaFilterPipe } from './coma-filter.pipe';

@NgModule({
  declarations: [ComaFilterPipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ComaFilterPipe]
})
export class PipesModule { }