import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { Observable, fromEvent, of } from 'rxjs';
import {
  map,
  distinctUntilChanged,
  debounceTime,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../shared/models/product';
import { Store } from '@ngxs/store';
import { AddToCart } from '../../../shared/actions/cart.actions';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
  providers: [ProductService],
})
export class CatalogComponent implements OnInit {
  products$: Observable<Product[]>;
  model?: Observable<any>;
  searchField$?: Observable<any>;
  @ViewChild('input', { static: true }) input!: ElementRef;
  @Output() searchEvent = new EventEmitter<string>();

  constructor(
    private productService: ProductService,
    private store: Store,
    private _service: ProductService
  ) {
    this.products$ = this.productService.getProducts();
  }

  ngOnInit(): void {}

  addToCart(product: Product) {
    this.store.dispatch(new AddToCart(product));
  }

  ngAfterViewInit(): void {
    this.searchField$ = fromEvent(this.input.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),

      distinctUntilChanged(),
      debounceTime(300),
      switchMap((searchTerm: string) =>
        this._service.searchCatalog(searchTerm).pipe(
          catchError((error) => {
            console.error('Erreur lors de la recherche :', error);
            return of([]);
          })
        )
      )
    );

    this.searchField$.subscribe((searchTerm) => {
      this.searchEvent.emit(searchTerm);
    });
  }
}
