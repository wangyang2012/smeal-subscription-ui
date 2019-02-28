import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubscriptionService} from '../service/subscription.service';

@Component({
  selector: 'app-create-subscription',
  templateUrl: './create-subscription.component.html',
  styleUrls: ['./create-subscription.component.css']
})
export class CreateSubscriptionComponent implements OnInit {

  private cart: string;

  constructor(private route: ActivatedRoute, private subscriptionService: SubscriptionService) { }

  ngOnInit() {
    console.log('CreateSubscription');
    this.route.queryParams.subscribe(params => {
      const cartId = params['cartId'];
      console.log('cartId: ' + cartId);
      this.subscriptionService.getCart(cartId).subscribe((response) => {
        console.log("response: " + response.value);
        this.cart = response.value;
      });

      // this.subscriptionService.test().subscribe(response => console.log(response));
    });
  }

}