import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../shared/models/product';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  productForm: FormGroup;
  message: string = '';

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      imgurl: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
    });
  }

  createProduct(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      productData.price = parseFloat(productData.price);

      const product: Product = productData;
      this.productService.createProduct(product).subscribe(
        (data) => {
          console.log('Produit ajouté avec succès', data);
          this.productForm.reset();
          this.message = 'Produit ajouté avec succès';
        },
        (error) => {
          console.log("Erreur lors de l'ajout du produit", error);
          this.message = "Erreur lors de l'ajout du produit";
        }
      );
    } else {
      this.message = 'Veuillez remplir tous les champs correctement.';
    }
  }
}
