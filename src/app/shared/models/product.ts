export class Product {
  id: number;
  name: string;
  imgurl: string;
  description: string;
  price: string;
  category: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.imgurl = '';
    this.description = '';
    this.price = '';
    this.category = '';
  }
}
