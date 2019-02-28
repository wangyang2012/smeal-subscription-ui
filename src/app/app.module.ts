import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CreateSubscriptionComponent } from './create-subscription/create-subscription.component';
import {AppRoutingModule} from './app-routing.module';
import {SubscriptionService} from './service/subscription.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CreateSubscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],

  providers: [SubscriptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
