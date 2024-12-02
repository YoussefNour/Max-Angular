import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentResultComponent } from './investment-result/investment-result.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, UserInputComponent, InvestmentResultComponent],
})
export class AppModule {}
