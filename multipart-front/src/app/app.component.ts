import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MultiService} from "./multi.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'multipart-front';
  partOne?: string;
  partTwo?: { name: string };
  partThree?: File;
  partFour?: File;

  constructor(private multiService: MultiService) {
    this.multiService.fetchMulti().subscribe((fd) => {

      this.partOne = fd.get("partOne") as string;

      this.partTwo = JSON.parse(fd.get("partTwo") as string);
      console.log(fd.get("partTwo"));

      this.partThree = fd.get("partThree") as File;

      this.partFour = fd.get("partFour") as File;
    });
  }

  download(theFile?: File) {
    if (!theFile) {
      return;
    }

    const downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(theFile);
    if (theFile.name)
      downloadLink.setAttribute('download', theFile.name);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    window.URL.revokeObjectURL(downloadLink.href);
    downloadLink.remove();
  }
}
