import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-reports',
  templateUrl: './view-reports.page.html',
  styleUrls: ['./view-reports.page.scss'],
})
export class ViewReportsPage implements OnInit {
  reports$: Observable<any[]>;

  constructor(private firestore: AngularFirestore) {
    this.reports$ = this.firestore
      .collection('reports', (ref) => ref.orderBy('createdAt', 'desc'))
      .valueChanges();
  }

  ngOnInit() {}

  downloadReport(downloadURL: string, fileName: string) {
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = fileName;
    link.click();
  }
}
