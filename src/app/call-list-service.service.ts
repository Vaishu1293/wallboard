import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CallListServiceService {

  constructor() { }

  queue_name = [
    'pmt_queries',
    'billing_queries',
    'leak_reports',
    'new_connections',
    'disconnection_requests',
    'meter_issues',
    'water_quality_complaints',
    'service_outages',
    'pressure_problems',
    'emergency_services',
    'account_updates',
    'payment_plans',
    'conservation_tips',
    'rebate_inquiries',
    'contractor_services',
    'commercial_accounts',
    'technical_support',
    'customer_feedback'
  ];

  call_list: any[] = [];

  getCallData(): Observable<any> {
    this.call_list = [];

    // Simulate real-time data
    for (const x of this.queue_name){
      // Generate random numbers for each type of call
      const callsDropped = Math.floor(Math.random() * 50);  // Random number between 0 and 32
      const callsAbonded = Math.floor(Math.random() * 50);  // Random number between 0 and 32
      const callsServiced = Math.floor(Math.random() * 200);  // Random number between 0 and 33

      // Calculate the total number of calls
      const totalCalls = callsDropped + callsAbonded + callsServiced;

      // Calculate the service level
      let serviceLevel = 0;
      if (totalCalls > 0) {
        serviceLevel = parseFloat(((callsServiced / totalCalls) * 100).toFixed(2));
      }

      let data = {
        'Queue Name': x,
        'Longest Waiting Call': Math.floor(Math.random() * 10) + ':' + Math.floor(Math.random() * 60),
        'Total No of calls': totalCalls,
        'No of Calls dropped': callsDropped,
        'No of Calls Abonded': callsAbonded,
        'No of calls serviced': callsServiced,
        'Service Level (%)': serviceLevel
      }
      this.call_list.push(data);
    }

    // this.call_list.sort((a, b) => {
    //   return b['Total No of calls'] - a['Total No of calls'];
    // });

    this.call_list.sort((a, b) => {
      // Convert "Longest Waiting Call" to total seconds for 'a'
      const [minutesA, secondsA] = a['Longest Waiting Call'].split(':').map(Number);
      const totalSecondsA = minutesA * 60 + secondsA;

      // Convert "Longest Waiting Call" to total seconds for 'b'
      const [minutesB, secondsB] = b['Longest Waiting Call'].split(':').map(Number);
      const totalSecondsB = minutesB * 60 + secondsB;

      // Compare
      return totalSecondsB - totalSecondsA;  // For descending order
    });


    return of(this.call_list);
  }

}


