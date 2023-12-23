import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CartState } from '../../shared/states/cart.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Select(CartState.cartItemCount) cartItemCount$:
    | Observable<number>
    | undefined;

  constructor() {}
}
