import { Component } from '@angular/core';
import { AnnualInvestment } from './models/annualnvestment.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  AnnualInvestments: AnnualInvestment[] = [];

  onCalculateInvestment(annualInvestments: any[]) {
    this.AnnualInvestments = annualInvestments;
  }
}
