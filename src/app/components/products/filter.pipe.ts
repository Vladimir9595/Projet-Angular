import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../shared/models/product';
@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(
    items: Array<Product>,
    searchOnName: string,
    searchOnCategory: string,
    searchOnPrice: number
  ): Array<Product> {
    if (!items) return [];

    return items.filter(
      (item) =>
        (item.name.toLowerCase().includes(searchOnName.toLowerCase()) ||
          searchOnName === '') &&
        (item.category.toLowerCase().includes(searchOnCategory.toLowerCase()) ||
          searchOnCategory === '') &&
        (item.price <= searchOnPrice || searchOnPrice === 0)
    );
  }
}
