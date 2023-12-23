import { Injectable } from '@angular/core';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { AddToCart, RemoveFromCart, ClearCart } from '../actions/cart.actions';
import { Product } from '../models/product';

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
  @Selector()
  static cartItems(state: CartStateModel) {
    return state.items;
  }

  @Selector()
  static cartItemCount(state: CartStateModel) {
    return state.items.length;
  }

  @Action(AddToCart)
  addToCart(ctx: StateContext<CartStateModel>, action: AddToCart) {
    const state = ctx.getState();
    ctx.patchState({
      items: [...state.items, action.payload],
    });
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
