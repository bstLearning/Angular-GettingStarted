import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "./product.service";
import { Iproduct } from "./prouduct";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export default class ProductListComponent implements OnInit, OnDestroy{
    pageTitle = 'Product List!';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    errorMessage = '';
    sub!: Subscription;  // definite assignmnet assertion in TypeScript

    private _listFilter: string = '';
    get listFilter(): string {
      return this._listFilter
    }
    set listFilter(value: string) {
      this._listFilter = value
      console.log('In setter: ', value);
      this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: Iproduct[] = []
    products: Iproduct[] = [];

    constructor(private productService: ProductService) {}

    performFilter(filterBy: string): Iproduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: Iproduct) => 
       product.productName.toLocaleLowerCase().includes(filterBy));
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    ngOnInit(): void {
      // observer obj observe the stream 
      // and responds 3 types of notifications: next, error, complete
      this.sub = this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products;
        },
        error: err => this.errorMessage = err
      }) 
    }

    ngOnDestroy(): void {
      this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
    }
};
