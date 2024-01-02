import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddToCart, RemoveFromCart, ClearCart } from '../actions/cart.actions';
import { Product } from '../models/product';
import { BehaviorSubject } from 'rxjs';

export interface CartStateModel {
  items: Product[];
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    items: [],
  },
})
@Injectable()
export class CartState {
  private cartTotalSubject = new BehaviorSubject<number>(0);

  @Selector()
  static cartItems(state: CartStateModel) {
    return state.items;
  }

  @Selector()
  static cartItemCount(state: CartStateModel) {
    return state.items.length;
  }

  @Selector()
  static cartTotal(state: CartStateModel) {
    return state.items.reduce((total, item) => total + item.price, 0);
  }

  @Action(AddToCart)
  addToCart(ctx: StateContext<CartStateModel>, action: AddToCart) {
    const state = ctx.getState();
    ctx.patchState({
      items: [...state.items, action.payload],
    });

    const newTotal = CartState.cartTotal(state);
    this.cartTotalSubject.next(newTotal);
  }

  @Action(RemoveFromCart)
  removeFromCart(ctx: StateContext<CartStateModel>, action: RemoveFromCart) {
    const state = ctx.getState();
    const updatedItems = state.items.filter(
      (item) => item.id !== action.payload
    );
    ctx.patchState({
      items: updatedItems,
    });
  }

  @Action(ClearCart)
  clearCart(ctx: StateContext<CartStateModel>) {
    ctx.setState({
      items: [],
    });
  }
}
