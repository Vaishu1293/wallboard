import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallListServiceService {

  constructor() { }

  getCallData(): Observable<any> {
    // Simulate real-time data
    const data = {
      'Sales': Math.floor(Math.random() * 100),
      'Support': Math.floor(Math.random() * 100),
      'HR': Math.floor(Math.random() * 100)
    };
    return of(data);
  }

}
