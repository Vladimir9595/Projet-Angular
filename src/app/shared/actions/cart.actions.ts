import { Product } from '../models/product';

export class AddToCart {
  static readonly type = '[Cart] Add to Cart';
  constructor(public payload: Product) {}
}

export class RemoveFromCart {
  static readonly type = '[Cart] Remove from Cart';
  constructor(public payload: number) {}
}
export class ClearCart {
  static readonly type = '[Cart] Clear Cart';
}
