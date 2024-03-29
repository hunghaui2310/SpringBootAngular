import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule, MatNativeDateModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule, MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {ItemsComponent} from './product/items/items.component';
import {SingleItemComponent} from './product/single-item/single-item.component';
import {ProCateComponent} from './product-cate/phong-khach/pro-cate.component';
import {ShowCartComponent} from './cart/show-cart/show-cart.component';
import {CheckoutComponent} from './cart/checkout/checkout.component';
import {BlogListComponent} from './blog/blog-list/blog-list.component';
import {BlogDetailComponent} from './blog/blog-detail/blog-detail.component';
import {AboutComponent} from './static/about/about.component';
import {ContactComponent} from './static/contact/contact.component';
import {CompareComponent} from './product/compare/compare.component';
import {OrderInfoComponent} from './cart/order-info/order-info.component';
import {ProfileComponent} from './account/profile/profile.component';
import {LoginComponent} from './account/login/login.component';
import {RegisterComponent} from './account/register/register.component';
import {LogoutComponent} from './account/logout/logout.component';
import {NotFoundComponent} from './account/not-found/not-found.component';
import {ApiService} from '../service/api.service';
import {ShowWishListComponent} from './wish-list/show-wish-list/show-wish-list.component';
import {BanAnComponent} from './product-cate/ban-an/ban-an.component';
import {TuQuanAoComponent} from './product-cate/tu-quan-ao/tu-quan-ao.component';
import {KeTiviComponent} from './product-cate/ke-tivi/ke-tivi.component';
import {ConfirmComponent} from './account/confirm/confirm.component';
import {ForgotPasswordComponent} from './account/forgot-password/forgot-password.component';
import {OrderUserComponent} from './account/order-user/order-user.component';

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
      path: 'product-category/1', component: ProCateComponent, data: { title: 'Bàn ghế phòng khách'}
    }, {
      path: 'product-category/2', component: BanAnComponent, data: { title: 'Bàn ghế phòng ăn'}
    }, {
      path: 'product-category/3', component: TuQuanAoComponent, data: { title: 'Tủ quần áo'}
    }, {
      path: 'product-category/4', component: KeTiviComponent, data: { title: 'Kệ ti vi'}
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
    }, {
      path: 'compare', component: CompareComponent, data: { title: 'So sánh sản phẩm'}
    }, {
      path: 'order-info', component: OrderInfoComponent, data: { title: 'Thông tin đơn hàng'}
    }, {
      path: 'wish-list', component: ShowWishListComponent, data: { title: 'Yêu thích'}
    }, {
      path: 'confirm', component: ConfirmComponent, data: { title: 'Xác thực'}
    }, {
      path: 'order-user', component: OrderUserComponent, data: { title: 'Thông tin hóa đơn'}
    }
    ]
  },
  {path: 'profile', component: ProfileComponent, canActivate: [ApiService], data: { title: 'Tài khoản của tôi'}},
  {path: 'login', component: LoginComponent, data: { title: 'Đăng nhập'}},
  {path: 'register', component: RegisterComponent, data: { title: 'Đăng kí'}},
  {path: 'logout', component: LogoutComponent, data: { title: 'Đăng xuất'}},
  {path: 'not-found', component: NotFoundComponent, data: { title: 'Không tìm thấy'}},
  {path: 'forgot-password', component: ForgotPasswordComponent, data: { title: 'Quên mật khẩu'}},
  // otherwise redirect to profile
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule,
    // Material
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatNativeDateModule]
})
export class AppRoutingModule { }
