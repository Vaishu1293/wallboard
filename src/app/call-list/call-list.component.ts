import { Component, OnInit } from '@angular/core';
import { CallListServiceService } from '../call-list-service.service';

@Component({
  selector: 'app-call-list',
  templateUrl: './call-list.component.html',
  styleUrls: ['./call-list.component.css']
})
export class CallListComponent implements OnInit {

  callData: any = {};  // Specify the type here
  columns: any[] = [];

  constructor(private callListService: CallListServiceService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.callListService.getCallData().subscribe((data: { [key: string]: number }) => {
        // console.log(data);
        if (this.columns.length < 1){
          this.columns = Object.keys(data[0]);
        }
        // console.log(this.columns);
        this.callData = data;
      });
    }, 2000);  // Fetch new data every 2 seconds
  }

  getRowClass(longestWaitingCall: string): string {
    // Convert "Longest Waiting Call" to total minutes
    const [minutes, seconds] = longestWaitingCall.split(':').map(Number);
    const totalMinutes = minutes + (seconds / 60);

    // Compare with 5 minutes
    if (totalMinutes > 5) {
      return 'table-danger';  // Red background for more than 5 minutes
    } else {
      return 'table-primary';  // Blue background for the rest
    }
  }


}
