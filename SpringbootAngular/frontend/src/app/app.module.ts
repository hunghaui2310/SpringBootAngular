import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule} from './app-routing.module';
import { FormsModule} from '@angular/forms';
import { NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './account/login/login.component';
import { LogoutComponent } from './account/logout/logout.component';
import { NotFoundComponent } from './account/not-found/not-found.component';
import { ProfileComponent } from './account/profile/profile.component';
import { RegisterComponent } from './account/register/register.component';
import { HttpClientModule} from '@angular/common/http';
import { MatDialogModule, MatFormFieldModule} from '@angular/material';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { ItemsComponent } from './product/items/items.component';
import { QuickViewComponent } from './product/quick-view/quick-view.component';
import { SingleItemComponent } from './product/single-item/single-item.component';
import { ProCateComponent } from './product/pro-cate/pro-cate.component';
import { ShowCartComponent } from './cart/show-cart/show-cart.component';
import { CheckoutComponent } from './cart/checkout/checkout.component';
import { BlogListComponent } from './blog/blog-list/blog-list.component';
import { BlogDetailComponent } from './blog/blog-detail/blog-detail.component';
import { AboutComponent } from './static/about/about.component';
import { ContactComponent } from './static/contact/contact.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WriteReviewComponent } from './product/write-review/write-review.component';
import {ToastrModule} from 'ngx-toastr';
import { CompareComponent } from './product/compare/compare.component';
import { OrderInfoComponent } from './cart/order-info/order-info.component';
import { IndexComponent } from './admin/index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    NotFoundComponent,
    ProfileComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    ItemsComponent,
    QuickViewComponent,
    SingleItemComponent,
    ProCateComponent,
    ShowCartComponent,
    CheckoutComponent,
    BlogListComponent,
    BlogDetailComponent,
    AboutComponent,
    ContactComponent,
    WriteReviewComponent,
    CompareComponent,
    OrderInfoComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 2000, progressBar: false, positionClass: 'toast-top-center'}),
    MatDialogModule,
    NgbModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [QuickViewComponent, WriteReviewComponent]
})
export class AppModule { }
