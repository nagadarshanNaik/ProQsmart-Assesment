import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  constructor() {}
  public csvFile: BehaviorSubject<File> = new BehaviorSubject<File>(null);
  private transformedData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    null
  );

  setFile(file: any) {
    this.csvFile.next(file);
  }

  getFile(): Observable<File> {
    return this.csvFile.asObservable();
  }

  setData(data: any[]) {
    this.transformedData.next(data);
  }

  getData(): Observable<any[]> {
    return this.transformedData.asObservable();
  }
}
