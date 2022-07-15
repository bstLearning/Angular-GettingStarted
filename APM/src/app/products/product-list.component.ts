import { Component, OnInit } from "@angular/core";
import { ProductService } from "./product.service";
import { Iproduct } from "./prouduct";

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export default class ProductListComponent implements OnInit{
    pageTitle = 'Product List!';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;

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
      this.products = this.productService.getProducts()
      this.filteredProducts = this.products
    }

    onRatingClicked(message: string): void {
      this.pageTitle = 'Product List: ' + message;
    }
};
