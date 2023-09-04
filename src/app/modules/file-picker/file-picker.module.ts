import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { FilePickerPageRoutingModule } from "./file-picker-routing.module";
import { FilePickerPage } from "./file-picker.page";


@NgModule({
  imports: [SharedModule, FilePickerPageRoutingModule],
  declarations: [FilePickerPage],
})
export class FilePickerPageModule {}
