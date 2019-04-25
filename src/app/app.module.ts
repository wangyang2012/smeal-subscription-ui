import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {CreateSubscriptionComponent} from './create-subscription/create-subscription.component';
import {AppRoutingModule} from './app-routing.module';
import {SubscriptionService} from './service/subscription.service';
import {HttpClientModule} from '@angular/common/http';
import {Module as StripeModule} from 'stripe-angular';
import {MatButtonModule, MatCardModule, MatDialogModule} from '@angular/material';
import {ThanksComponent} from './thanks/thanks.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateSubscriptionComponent,
    ThanksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    StripeModule.forRoot()
  ],

  providers: [SubscriptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
