import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { SharedDataService } from '../Services/shared-data.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss',
})
export class UploadFileComponent {
  @ViewChild('uploadFile') uploadFile: ElementRef<HTMLInputElement>;
  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
    private http: HttpClient
  ) {}
  csvFile: File = null;
  fileError: string = '';
  onUploadClick() {
    document.getElementById('uploadFile')?.click();
    this.uploadFile.nativeElement.click();
  }
  onFileChange(event: any) {
    this.csvFile = event.target.files[0];
    this.fileError = null;
    if (this.csvFile && this.csvFile.type !== 'text/csv') {
      this.fileError = 'Invalid file format. Please upload a CSV file.';
      this.csvFile = null;
    }
  }
  onUpload() {
    if (this.csvFile) {
      this.sharedDataService.setFile(this.csvFile);
      this.router.navigate(['/preview']);
    }
  }
  onRemovefile() {
    this.csvFile = null;
    this.uploadFile.nativeElement.value = '';
  }
}
