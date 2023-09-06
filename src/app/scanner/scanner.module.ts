import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerPageRoutingModule } from './scanner-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ScannerPage } from './scanner.page';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ScrollingModule,
    PipesModule,
    ScannerPageRoutingModule
  ],
  declarations: [ScannerPage]
})
export class ScannerPageModule {}
