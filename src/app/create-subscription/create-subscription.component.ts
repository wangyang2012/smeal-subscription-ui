import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SubscriptionService} from '../service/subscription.service';
import {StripeScriptTag, StripeToken} from 'stripe-angular';
import {Customer} from '../model/Customer';
import {Cart} from '../model/Cart';
import {Subscription} from '../model/Subscription';
import {MatDialog} from '@angular/material';

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
  private invalidError: Error;
  private extraData = {};

  constructor(private route: ActivatedRoute, private subscriptionService: SubscriptionService, public stripeScriptTag: StripeScriptTag, private router: Router) {
    this.stripeScriptTag.setPublishableKey( this.publishableKey );
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const cartId = params['cartId'];
      this.subscriptionService.getCart(cartId).subscribe((response: Cart) => {
        this.cart = response;
      });

      const customerId = params['customerId'];
      console.log('try params.customerId');
      const customerToken = params['customerToken'];
      this.subscriptionService.getCustomer(customerId, customerToken).subscribe((response: Customer) => {
        this.customer = response;
        this.extraData = {
          'name': this.customer.firstName + ' ' + this.customer.lastName.toUpperCase(),
          'address_city': 'Paris',
          'address_line1': '1, rue ABC',
          'address_line2': '',
          'address_state': '',
          'address_zip': '75001'
        };
      });
    });
  }

  // function createSubscription() {
  //
  // }


  onStripeInvalid( error: Error ) {
    console.log('Validation Error', error);
  }

  setStripeToken( token: StripeToken) {
    console.log('Stripe token', token);
    const sub = new Subscription();
    sub.email = this.customer.email;
    sub.productPrice = this.cart.totalTtc.replace(',', '');
    sub.userName = this.customer.firstName + ' ' + this.customer.lastName;
    sub.stripeToken = token.id;
    this.subscriptionService.createSubscription(sub).subscribe(response => {
      this.router.navigate(['/thanks']);
    });
  }

  onStripeError( error: Error ){
    console.error('Stripe error', this.token);
  }


  testDirection(): void {
    this.router.navigate(['/thanks']);
  }
}
