import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState } from '../../shared/states/cart.state';
import {
  RemoveFromCart,
  ClearCart,
} from '../../shared/actions/cart.actions';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  @Select(CartState.cartItems) cartItems$: Observable<Product[]> | undefined;

  constructor(private store: Store) {}

  removeFromCart(productId: number) {
    this.store.dispatch(new RemoveFromCart(productId));
  }

  clearCart() {
    this.store.dispatch(new ClearCart());
  }
}
