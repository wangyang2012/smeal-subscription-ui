import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionService} from '../service/subscription.service';
import {KeyValue} from '../model/KeyValue';
import {StripeScriptTag, StripeToken} from "stripe-angular";

@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.css']
})
export class CreateSubscriptionComponent implements OnInit {

  private cart: string;
  private customer: string;
  private publishableKey = 'pk_test_ghenbt4wGKIXtmvhdHoSlUKk';
  private token = '';

  constructor(private route: ActivatedRoute, private subscriptionService: SubscriptionService, public stripeScriptTag: StripeScriptTag) {
    this.stripeScriptTag.setPublishableKey( this.publishableKey );
    console.log('set publishableKey');
  }

  ngOnInit() {
    console.log('CreateSubscription');
    this.route.queryParams.subscribe(params => {
      const cartId = params['cartId'];
      console.log('cartId: ' + cartId);
      this.subscriptionService.getCart(cartId).subscribe((response: KeyValue) => {
        console.log("response: " + response.value);
        this.cart = response.value;
      });

      const customerId = params['customerId'];
      console.log('customerId: ' + customerId);
      this.subscriptionService.getCustomer(customerId).subscribe((response: KeyValue) => {
        console.log("response: " + response.value);
        this.customer = response.value;
      });

      // this.subscriptionService.test().subscribe(response => console.log(response));
    });
  }

  // function createSubscription() {
  //
  // }

  extraData = {
    'name': 'Yang',
    'address_city': 'Paris',
    'address_line1': '1, rue ABC',
    'address_line2': '',
    'address_state': '',
    'address_zip': '75001'
  }

  onStripeInvalid( error: Error ){
    console.log('Validation Error', error);
  }

  setStripeToken( token: StripeToken){
    console.log('Stripe token', token);
    this.subscriptionService.createSubscription(token.id).subscribe(response => {
      alert('Paiement réussi!');
    });
  }

  onStripeError( error: Error ){
    console.error('Stripe error', this.token);
  }
}
