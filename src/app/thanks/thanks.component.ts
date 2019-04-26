import {Component, OnInit} from '@angular/core';
import {StripeToken} from 'stripe-angular';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {
  }

  setStripeToken( token: StripeToken) {
  }
}
