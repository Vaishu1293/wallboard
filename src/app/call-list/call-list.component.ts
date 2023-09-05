import { Component, OnInit } from '@angular/core';
import { CallListServiceService } from '../call-list-service.service';

@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css']
})
export class CallListComponent implements OnInit {

  callData: { [key: string]: number } = {};  // Specify the type here
  maxCalls: number = 0;
  minCalls: number = Infinity;

  constructor(private callListService: CallListServiceService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.callListService.getCallData().subscribe((data: { [key: string]: number }) => {
        // Sort the data by value in descending order
        const sortedData = Object.entries(data)
          .sort(([, a], [, b]) => b - a)
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

        this.callData = sortedData;

        const values = Object.values(sortedData).map(Number);  // Convert to numbers
        this.maxCalls = Math.max(...values);
        this.minCalls = Math.min(...values);
      });
    }, 2000);  // Fetch new data every 2 seconds
  }

  getRowClass(value: number): string {
    if (value === this.maxCalls) {
      return 'table-danger';
    } else if (value === this.minCalls) {
      return 'table-success';
    } else {
      return 'table-primary';
    }
  }

}
