import { Component, OnInit } from '@angular/core';
import { SharedDataService } from '../Services/shared-data.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './preview.component.html',
  styleUrl: './preview.component.scss',
})
export class PreviewComponent implements OnInit {
  data: any[] = [];
  hasErrors: boolean = false;
  constructor(
    private sharedDataService: SharedDataService,
    private router: Router,
    private ngxCsvParser: NgxCsvParser
  ) {}
  ngOnInit() {
    this.sharedDataService.getFile().subscribe((file) => {
      if (file) {
        this.ngxCsvParser
          .parse(file, { header: true, delimiter: ',', encoding: 'utf8' })
          .pipe()
          .subscribe({
            next: (result: any): void => {
              if (Array.isArray(result)) {
                this.data = result.map((row: any) => ({
                  name: row.Name,
                  email: row.Email,
                  phoneNumber: row['Phone number'],
                  city: row.City,
                  address: row.Address,
                  gpa: row.GPA,
                  errors: this.validateRow(row),
                }));
              } else {
              }
            },
            error: (error: NgxCSVParserError): void => {},
          });
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  validateRow(row: any) {
    let errors: any = {
      name:
        this.checkEmpty(row.Name, 'Name cannot be empty') ||
        this.checkMixedDataTypes(row.Name, 'Name contains mixed data types'),
      email:
        this.checkEmpty(row.Email, 'Email cannot be empty') ||
        this.checkInvalidEmail(row.Email),
      phoneNumber:
        this.checkEmpty(row['Phone number'], 'Phone number cannot be empty') ||
        this.checkInvalidPhoneNumber(row['Phone number']),
      city:
        this.checkEmpty(row.City, 'City cannot be empty') ||
        this.checkMixedDataTypes(row.City, 'City contains mixed data types'),
      address:
        this.checkEmpty(row.Address, 'Address cannot be empty') ||
        this.checkMixedDataTypes(
          row.Address,
          'Address contains mixed data types'
        ),
      gpa:
        this.checkEmpty(row.GPA, 'GPA cannot be empty') ||
        this.checkInvalidGpa(row.GPA),
    };
    return errors;
  }

  checkEmpty(value: any, errorMessage: string) {
    return !value ? errorMessage : null;
  }
  checkMixedDataTypes(value: string, errorMessage: string) {
    if (typeof value !== 'string') {
      return null;
    }
    const parts = value.split(',');
    const types = parts.map((part) => this.detectDataType(part.trim()));

    return new Set(types).size > 1 ? errorMessage : null;
  }

  checkInvalidEmail(value: string) {
    const emailValidation =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return !emailValidation.test(String(value).toLowerCase())
      ? 'Invalid email format'
      : null;
  }

  checkInvalidPhoneNumber(value: string) {
    return !/^\d{10}$/.test(value)
      ? 'Phone number must be a 10 digit number'
      : null;
  }

  checkInvalidGpa(value: any) {
    return isNaN(value) || value < 0 || value > 10
      ? 'GPA must be a number between 0 and 10'
      : null;
  }

  detectDataType(value: string): string {
    if (/^\d+$/.test(value)) {
      return 'number';
    } else if (/^\d*\.\d+$/.test(value)) {
      return 'float';
    } else if (/^[a-zA-Z]+$/.test(value)) {
      return 'string';
    } else {
      return 'unknown';
    }
  }
  onContinue() {
    this.sharedDataService.setData(this.data);
    this.router.navigate(['/summary']);
  }
}
