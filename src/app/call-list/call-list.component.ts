import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CallListServiceService } from '../call-list-service.service';


@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CallListComponent implements OnInit {

  callData: any = [];  // Specify the type here
  columns: any[] = [];
  class_table: string = 'table-red';

  constructor(private callListService: CallListServiceService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.callListService.getCallData().subscribe((data: { [key: string]: number }) => {

        if (this.columns.length < 1){
          this.columns = Object.keys(data[0]);
        }
        // console.log(this.columns);
        this.callData = data;
        console.log(Array.isArray(this.callData));
      });
    }, 2000);  // Fetch new data every 2 seconds
  }

  getRowClass(longestWaitingCall: string): string {
    // Convert "Longest Waiting Call" to total minutes
    console.log('Longest Waiting Call:', longestWaitingCall);

    const [minutes, seconds] = longestWaitingCall.split(':').map(Number);
    const totalMinutes = minutes + (seconds / 60);

    // Compare with 5 minutes
    if (totalMinutes > 5) {
      return 'table-red tr';  // Red background for more than 5 minutes
    } else {
      return 'table-green tr';  // Blue background for the rest
    }
  }


}
