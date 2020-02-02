import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CategoryAdminService} from '../../../service/admin/category-admin.service';
import {Category} from '../../../model/category';
import {Product} from '../../../model/product';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  categories: Category[];
  mobjNewProduct: Product = new Product();
  productName;
  discount;
  codeDiscount;
  price;
  description;
  categoryId;
  mobjFileList: FileList;
  url: any;

  constructor(private dialogRef: MatDialogRef<CreateProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private categoryService: CategoryAdminService) { }

  ngOnInit() {
    this.getComboboxCate();
    this.categoryId = null;
  }

  closeForm(): void {
    this.dialogRef.close(true);
  }

  getComboboxCate() {
    this.categoryService.getCategoryAPI().subscribe(
      data => {
        console.log('dataCategory', data);
        this.categories = data['data'];
      },
      error => (console.log('NO DATA!'))
    );
  }

  selectBigFile(pobjEvent) {
    if (pobjEvent.target.files && pobjEvent.target.files.length > 0) {
      this.mobjFileList = pobjEvent.target.files;
      const vfileFile: File = this.mobjFileList[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.mobjFileList[0]);
      reader.onload = _event => {
        this.url = reader.result;
      };
      this.mobjNewProduct.urlImage = vfileFile.name;
    }
  }

  smallFileSelected(event) {

  }
}
