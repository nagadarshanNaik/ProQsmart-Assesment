import { Routes } from '@angular/router';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { PreviewComponent } from './preview/preview.component';
import { SummaryComponent } from './summary/summary.component';

export const routes: Routes = [
  { path: '', redirectTo: 'upload', pathMatch: 'full' }, // Default route
  { path: 'upload', component: UploadFileComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'summary', component: SummaryComponent },
  { path: '**', redirectTo: 'upload' }, // Wildcard route for a 404 page
];
