import { Component } from '@angular/core';
import { SharedDataService } from '../Services/shared-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  totalRows: number = 0;
  correctRows: number = 0;
  incorrectRows: number = 0;
  constructor(
    private sharedDataService: SharedDataService,
    private router: Router
  ) {}

  ngOnInit() {
    const data = this.sharedDataService.getData().subscribe((data) => {
      this.totalRows = data.length;
      this.correctRows = data.filter(
        (row) => !Object.values(row.errors).some((error) => error)
      ).length;
      this.incorrectRows = this.totalRows - this.correctRows;
    });
  }
  goToUpload() {
    this.router.navigate(['/upload']);
  }
}
