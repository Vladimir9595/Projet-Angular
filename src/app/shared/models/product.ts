export class Product {
  id: number;
  name: string;
  imgurl: string;
  description: string;
  price: number;
  category: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.imgurl = '';
    this.description = '';
    this.price = 0;
    this.category = '';
  }
}
