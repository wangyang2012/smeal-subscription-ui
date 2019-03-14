import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionService} from '../service/subscription.service';
import {KeyValue} from '../model/KeyValue';
import {StripeScriptTag, StripeToken} from "stripe-angular";
import {Customer} from "../model/Customer";
import {Cart} from '../model/Cart';

@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.css']
})
export class CreateSubscriptionComponent implements OnInit {

  private cart: Cart = new Cart();
  private customer: Customer = new Customer();
  private publishableKey = 'pk_test_ghenbt4wGKIXtmvhdHoSlUKk';
  private token = '';

  constructor(private route: ActivatedRoute, private subscriptionService: SubscriptionService, public stripeScriptTag: StripeScriptTag) {
    this.stripeScriptTag.setPublishableKey( this.publishableKey );
    console.log('set publishableKey');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const cartId = params['cartId'];
      this.subscriptionService.getCart(cartId).subscribe((response: Cart) => {
        this.cart = response;
      });

      const customerId = params['customerId'];
      this.subscriptionService.getCustomer(customerId).subscribe((response: Customer) => {
        this.customer = response;
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
