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
    return state.items.reduce((count, item) => count + item.quantity, 0);
  }

  @Selector()
  static cartTotal(state: CartStateModel) {
    return state.items.reduce(
      (total, item) => total + item.quantity * parseFloat(item.price),
      0
    );
  }

  @Action(AddToCart)
  addToCart(ctx: StateContext<CartStateModel>, action: AddToCart) {
    const state = ctx.getState();
    const existingItem = state.items.find(
      (item) => item.id === action.payload.id
    );

    if (existingItem) {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      ctx.patchState({
        items: updatedItems,
      });
    } else {
      ctx.patchState({
        items: [...state.items, { ...action.payload, quantity: 1 }],
      });
    }

    const newTotal = CartState.cartTotal(state);
    this.cartTotalSubject.next(newTotal);
  }

  @Action(RemoveFromCart)
  removeFromCart(ctx: StateContext<CartStateModel>, action: RemoveFromCart) {
    const state = ctx.getState();
    const itemToRemove = state.items.find((item) => item.id === action.payload);

    if (itemToRemove) {
      if (itemToRemove.quantity > 1) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );

        ctx.patchState({
          items: updatedItems,
        });
      } else {
        const updatedItems = state.items.filter(
          (item) => item.id !== action.payload
        );

        ctx.patchState({
          items: updatedItems,
        });
      }

      const newTotal = CartState.cartTotal({ items: state.items });
      this.cartTotalSubject.next(newTotal);
    }
  }

  @Action(ClearCart)
  clearCart(ctx: StateContext<CartStateModel>) {
    ctx.setState({
      items: [],
    });
  }
}
