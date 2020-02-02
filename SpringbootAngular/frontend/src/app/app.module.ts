import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  MatDialogModule, MatDialogRef,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TestDialogComponent } from './test-dialog/test-dialog.component';
import {ToastrModule} from 'ngx-toastr';
import {HeaderComponent} from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { HttpClientModule} from '@angular/common/http';
import { ItemsComponent } from './product/items/items.component';
import { CompareComponent } from './product/compare/compare.component';
import { ProCateComponent } from './product/pro-cate/pro-cate.component';
import { QuickViewComponent } from './product/quick-view/quick-view.component';
import { SingleItemComponent } from './product/single-item/single-item.component';
import { WriteReviewComponent } from './product/write-review/write-review.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { OrderInfoComponent } from './cart/order-info/order-info.component';
import { ShowCartComponent } from './cart/show-cart/show-cart.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { AboutComponent } from './static/about/about.component';
import { ContactComponent } from './static/contact/contact.component';
import {LoginComponent} from './account/login/login.component';
import {LogoutComponent} from './account/logout/logout.component';
import {NotFoundComponent} from './account/not-found/not-found.component';
import {ProfileComponent} from './account/profile/profile.component';
import {RegisterComponent} from './account/register/register.component';
import {NgbCarouselModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxPaginationModule} from 'ngx-pagination';
import { StepperInputComponent } from './cart/stepper-input/stepper-input.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import { ShowWishListComponent } from './wish-list/show-wish-list/show-wish-list.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { CreateProductComponent } from './admin/create-product/create-product.component';
import { CreateBlogComponent } from './admin/create-blog/create-blog.component';
import { CreateCategoryComponent } from './admin/create-category/create-category.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import {AccordionModule, ModalModule, TooltipModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    TestDialogComponent,
    HeaderComponent,
    FooterComponent,
    ItemsComponent,
    CompareComponent,
    ProCateComponent,
    QuickViewComponent,
    SingleItemComponent,
    WriteReviewComponent,
    CheckoutComponent,
    OrderInfoComponent,
    ShowCartComponent,
    BlogListComponent,
    BlogDetailComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    LogoutComponent,
    NotFoundComponent,
    ProfileComponent,
    RegisterComponent,
    StepperInputComponent,
    ShowWishListComponent,
    HomeAdminComponent,
    CreateProductComponent,
    CreateBlogComponent,
    CreateCategoryComponent,
    HeaderAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 2000, progressBar: false, positionClass: 'toast-top-center'}),
    MatToolbarModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    NgbCarouselModule,
    NgxPaginationModule,
    CarouselModule,
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TestDialogComponent, WriteReviewComponent, QuickViewComponent, CreateProductComponent,
    CreateBlogComponent,
    CreateCategoryComponent]
})
export class AppModule { }
