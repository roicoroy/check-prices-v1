import { NgModule } from "@angular/core";
import { SharedModule } from "../shared.module";
import { FileOpenerPageRoutingModule } from "./file-opener-routing.module";
import { FileOpenerPage } from "./file-opener.page";


@NgModule({
  imports: [SharedModule, FileOpenerPageRoutingModule],
  declarations: [FileOpenerPage],
})
export class FileOpenerPageModule {}
