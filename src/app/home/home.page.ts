import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public plugins = [
    {
      name: 'File Opener',
      url: '/file-opener',
    },
    {
      name: 'File Picker',
      url: '/file-picker',
    },
  ];

  constructor() {}
}
