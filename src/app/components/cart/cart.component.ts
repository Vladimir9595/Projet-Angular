import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState } from '../../shared/states/cart.state';
import { RemoveFromCart, ClearCart } from '../../shared/actions/cart.actions';
import { Product } from '../../shared/models/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  message: string = '';
  @Select(CartState.cartItems) cartItems$: Observable<Product[]> | undefined;
  @Select(CartState.cartTotal) cartTotal$: Observable<number> | undefined;
  cartTotal: number = 0;

  constructor(private store: Store) {}

  ngOnInit() {
    this.cartTotal$?.subscribe((total) => {
      this.cartTotal = total;
    });
  }

  removeFromCart(productId: number) {
    this.store.dispatch(new RemoveFromCart(productId));
  }

  clearCart() {
    this.store.dispatch(new ClearCart());
    this.message = 'Payement effectué avec succès';
  }
}
