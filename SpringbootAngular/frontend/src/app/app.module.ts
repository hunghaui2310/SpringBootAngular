import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';



import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './product/product.component';
import { StarterComponent } from './starter/starter.component';
import { FooterComponent } from './footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { LoginComponent } from './account/login/login.component';
import { LogoutComponent } from './account/logout/logout.component';
import { NotFoundComponent } from './account/not-found/not-found.component';
import { ProfileComponent } from './account/profile/profile.component';
import { RegisterComponent } from './account/register/register.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { OrderComponent } from './cart/order/order.component';
import {CartDetailComponent} from './cart/cart-detail/cart-detail.component';
import { AboutComponent } from './static/about/about.component';
import { ProIndustryComponent } from './product/pro-industry/pro-industry.component';
import { BlogComponent } from './static/blog/blog.component';
import { Blog1Component } from './static/blog/blog1/blog1.component';
import { BuyNowComponent } from './product/buy-now/buy-now.component';
import {MatDialogModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    StarterComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    NotFoundComponent,
    ProfileComponent,
    RegisterComponent,
    ProductDetailComponent,
    CartDetailComponent,
    OrderComponent,
    AboutComponent,
    ProIndustryComponent,
    BlogComponent,
    Blog1Component,
    BuyNowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    FormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [BuyNowComponent]
})
export class AppModule { }
