import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { CartState } from '../../shared/states/cart.state';
import { ClientService } from '../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Select(CartState.cartItemCount) cartItemCount$:
    | Observable<number>
    | undefined;

  private cnxSubscription: Subscription;
  cnx: boolean = false;

  constructor(private clientService: ClientService, private router: Router) {
    this.cnxSubscription = this.clientService
      .getCnxObservable()
      .subscribe((cnx) => {
        this.cnx = cnx;
      });
  }

  ngOnDestroy(): void {
    this.cnxSubscription.unsubscribe();
  }

  //   get isClientLoggedIn(): boolean {
  //     return this.clientService.isClientLoggedIn();
  //   }

  logout() {
    this.clientService.logoutClient();
    this.clientService.setClientLoggedOut();
    this.cnx = false;
    this.router.navigate(['/accueil']);
  }
}
