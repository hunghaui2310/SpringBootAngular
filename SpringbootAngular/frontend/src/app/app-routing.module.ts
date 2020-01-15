import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './account/login/login.component';
import {RegisterComponent} from './account/register/register.component';
import {LogoutComponent} from './account/logout/logout.component';
import {NotFoundComponent} from './account/not-found/not-found.component';
import {ProfileComponent} from './account/profile/profile.component';
import {ApiService} from '../api.service';
import {SingleItemComponent} from './product/single-item/single-item.component';
import {ItemsComponent} from './product/items/items.component';
import {ProCateComponent} from './product/pro-cate/pro-cate.component';
import {AppComponent} from './app.component';
import {ShowCartComponent} from './cart/show-cart/show-cart.component';
import {CheckoutComponent} from './cart/checkout/checkout.component';
import {BlogListComponent} from './blog/blog-list/blog-list.component';
import {BlogDetailComponent} from './blog/blog-detail/blog-detail.component';
import {AboutComponent} from './static/about/about.component';
import {ContactComponent} from './static/contact/contact.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: '',
    // component: AppComponent,
    children: [{
      path: 'home', component: ItemsComponent, data: { title: 'Trang chủ'}
     }, {
       path: 'detail/:id', component: SingleItemComponent, data: { title: 'Chi tiết sản phẩm' }
     }, {
      path: 'product-category/:id', component: ProCateComponent, data: { title: 'Sản phẩm'}
    }, {
      path: 'cart', component: ShowCartComponent, data: { title: 'Giỏ hàng'}
    }, {
      path: 'checkout', component: CheckoutComponent, data: { title: 'Thanh toán'}
    }, {
      path: 'blog', component: BlogListComponent, data: { title: 'Tin tức'}
    }, {
      path: 'detail-blog/:id', component: BlogDetailComponent, data: { title: 'Tin nổi bật'}
    }, {
      path: 'about', component: AboutComponent, data: { title: 'Giới thiệu'}
    }, {
      path: 'contact', component: ContactComponent, data: { title: 'Liên hệ'}
    }
    ]
  },
  {path: 'profile', component: ProfileComponent, canActivate: [ApiService], data: { title: 'Tài khoản của tôi'}},
  {path: 'login', component: LoginComponent, data: { title: 'Đăng nhập'}},
  {path: 'register', component: RegisterComponent, data: { title: 'Đăng kí'}},
  {path: 'logout', component: LogoutComponent, data: { title: 'Đăng xuất'}},
  {path: 'not-found', component: NotFoundComponent, data: { title: 'Không tìm thấy'}},
  // otherwise redirect to profile
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
