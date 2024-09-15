import { Injectable } from '@angular/core';
import html2pdf from 'html2pdf.js';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generatePDF(element: HTMLElement, filename: string, config?: any) {
    console.log(config)
    const options = {
      margin: config.margin ?? 0.5,
      filename: filename,
      image: { type: config.ext ?? 'png', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true  },
      jsPDF: { unit: 'in', format: config.format ?? 'a5', orientation: config.orientation ?? 'portrait' }
    };

    return html2pdf().from(element).set(options).save();
  }
}
