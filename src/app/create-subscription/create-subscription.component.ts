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
      const customerId = params['customerId'];
      const customerToken = params['customerToken'];

      if (!cartId || !customerId || !customerToken ) {
        this.showError();
      }

      this.subscriptionService.getCart(cartId).subscribe((response: Cart) => {
        this.cart = response;
        if (this.cart.idCustomer != customerId) {
          this.showError();
        }
      });

      this.subscriptionService.getCustomer(customerId, cartId, customerToken).subscribe((response: Customer) => {
        if (response == null) {
          this.showError();
        }
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
    this.showError();
  }

  showError() {
    this.router.navigate(['/error']);
  }

}
