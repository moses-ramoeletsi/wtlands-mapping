import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  constructor() {}

  ngOnInit() {}

  reportType?: string;
  filter = {
    dateFrom: '',
    dateTo: '',
    wetlandId: null,
    userId: null
  };
  wetlands = []; // This would come from your data source
  users = []; // This would come from your data source
  reportGenerated = false;
  reportContent = '';



  generateReport() {
    // Example logic for generating a report
    if (this.reportType === 'wetlands') {
      this.generateWetlandsReport();
    } else if (this.reportType === 'user-activities') {
      this.generateUserActivitiesReport();
    }
    this.reportGenerated = true;
  }

  generateWetlandsReport() {
    // Implement your logic to generate the wetlands report
    this.reportContent = `Wetlands Report from ${this.filter.dateFrom} to ${this.filter.dateTo}`;
    // Populate with real data
  }

  generateUserActivitiesReport() {
    // Implement your logic to generate the user activities report
    this.reportContent = `User Activities Report from ${this.filter.dateFrom} to ${this.filter.dateTo}`;
    // Populate with real data
  }

  downloadReport() {
    // Logic to download the report as a file (e.g., PDF or CSV)
    const blob = new Blob([this.reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.docx'; // Change the extension based on the file type
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // reportType: string = 'wetlands';
  // startDate?: string;
  // endDate?: string;
  // selectedWetland?: string;
  // selectedUser?: string;
  // reportGenerated: boolean = false;
  // reportData: any;

  // wetlands = [
  //   { id: '1', name: 'Wetland 1' },
  //   { id: '2', name: 'Wetland 2' },
  // ];

  // users = [
  //   { id: '1', username: 'User 1' },
  //   { id: '2', username: 'User 2' },
  // ];


  // generateReport() {
  //   this.reportGenerated = true;

  //   if (this.reportType === 'wetlands') {
  //     this.reportData = this.generateWetlandsReport();
  //   } else if (this.reportType === 'userActivities') {
  //     this.reportData = this.generateUserActivitiesReport();
  //   }
  // }

  // generateWetlandsReport() {
  //   // Logic to generate wetlands report based on selected filters
  //   return {
  //     type: 'Wetlands Data',
  //     filters: {
  //       startDate: this.startDate,
  //       endDate: this.endDate,
  //       wetland: this.selectedWetland,
  //     },
  //     data: [
  //       // Example data
  //       { name: 'Wetland 1', size: '100 acres', type: 'Marsh' },
  //       { name: 'Wetland 2', size: '200 acres', type: 'Swamp' },
  //     ],
  //   };
  // }

  // generateUserActivitiesReport() {
  //   // Logic to generate user activities report based on selected filters
  //   return {
  //     type: 'User Activities',
  //     filters: {
  //       startDate: this.startDate,
  //       endDate: this.endDate,
  //       user: this.selectedUser,
  //     },
  //     data: [
  //       // Example data
  //       { username: 'User 1', activity: 'Searched for Wetland 1' },
  //       { username: 'User 2', activity: 'Saved Wetland 2' },
  //     ],
  //   };
  // }


}
