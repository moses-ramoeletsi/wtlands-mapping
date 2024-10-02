import { Component, OnInit } from '@angular/core';
import { WetlandsService } from 'src/app/services/wetlands.service';
import jsPDF from 'jspdf';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  wetlands: any[] = [];
  savedWetlands: any[] = [];
  userFeedback: any[] = [];
  userId: string = '';

  constructor(
    private wetlandsService: WetlandsService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.fetchWetlands();
  }

  fetchWetlands() {
    this.wetlandsService.fetchWetlandData().subscribe((data: any[]) => {
      this.wetlands = data;
    });
  }

  async generateReport() {
    try {
      const user = await this.auth.currentUser;
      if (!user) {
        this.presentToast('You must be logged in to save reports.');
        return;
      }

      const doc = new jsPDF();
      let yOffset = 10;

      const logoUrl = "../../../assets/images/logo.png";
      const logoWidth = 40;
      const logoHeight = 40;
      doc.addImage(logoUrl, 'PNG', 10, yOffset, logoWidth, logoHeight);

      doc.setFontSize(22);
      doc.setTextColor(0, 100, 0); 
      doc.text('Leostho Wetlands Mapping', 60, yOffset + 25);

      yOffset += logoHeight + 20;

      doc.setFontSize(18);
      doc.setTextColor(0, 0, 0); 
      doc.text('Wetlands Report', 10, yOffset);
      yOffset += 10;

      doc.setFontSize(12);
      doc.text(`Total Wetlands: ${this.wetlands.length}`, 10, yOffset);
      yOffset += 10;

      this.wetlands.forEach((wetland, index) => {
        if (yOffset > 280) {
          doc.addPage();
          yOffset = 10;
        }

        doc.setFontSize(14);
        doc.text(`${index + 1}. ${wetland.wetland_name}`, 10, yOffset);
        yOffset += 7;

        doc.setFontSize(10);
        doc.text(`Type: ${wetland.wetland_type}`, 15, yOffset);
        yOffset += 5;
        doc.text(`District: ${wetland.district}`, 15, yOffset);
        yOffset += 5;
        doc.text(`Size: ${wetland.wetland_size}`, 15, yOffset);
        yOffset += 5;
        doc.text(`Coordinates: ${wetland.location_coordinates}`, 15, yOffset);
        yOffset += 5;
        doc.text(`Conservation Status: ${wetland.conservation_status}`, 15, yOffset);
        yOffset += 10;
      });

      const pdfBlob = doc.output('blob');
      const fileName = `wetlands-report-${new Date().getTime()}.pdf`;
      const filePath = `reports/${user.uid}/${fileName}`;

      const uploadTask = await this.storage.upload(filePath, pdfBlob);
      const downloadURL = await uploadTask.ref.getDownloadURL();

      await this.firestore.collection('reports').add({
        fileName: fileName,
        createdAt: new Date(),
        downloadURL: downloadURL,
        userId: user.uid
      });

      this.presentToast('Report saved successfully');
    } catch (error) {
      console.error('Error saving report:', error);
      this.presentToast('Error saving report. Please try again.');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}