import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { RouterModule, Routes } from '@angular/router';
import { ApiHttpInterceptor } from './http-interceptor';

import { CartState } from './shared/states/cart.state';
import { ProductService } from './services/product.service';
import { FilterPipe } from './components/products/filter.pipe';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CatalogComponent } from './components/products/catalog/catalog.component';
import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/users/login/login.component';
import { CreateComponent } from './components/products/create/create.component';
import { LandingComponent } from './components/landing/landing.component';
import { UserComponent } from './components/users/create/create.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  {
    path: 'catalogue',
    component: CatalogComponent,
    canActivate: [AuthGuard],
  },
  { path: 'panier', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'accueil', component: LandingComponent },
  { path: 'create-produit', component: CreateComponent },
  { path: 'create-utilisateur', component: UserComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CatalogComponent,
    CartComponent,
    LoginComponent,
    FilterPipe,
    CreateComponent,
    LandingComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxsModule.forRoot([CartState]),
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true },
    ProductService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
