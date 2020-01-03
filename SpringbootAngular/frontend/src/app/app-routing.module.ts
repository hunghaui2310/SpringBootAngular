import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './account/login/login.component';
import {RegisterComponent} from './account/register/register.component';
import {LogoutComponent} from './account/logout/logout.component';
import {NotFoundComponent} from './account/not-found/not-found.component';
import {ProfileComponent} from './account/profile/profile.component';
import {ApiService} from '../api.service';
import {ProductDetailComponent} from './product/product-detail/product-detail.component';
import {OrderComponent} from './cart/order/order.component';
import {CartDetailComponent} from './cart/cart-detail/cart-detail.component';
import {ProIndustryComponent} from './product/pro-industry/pro-industry.component';
import {AboutComponent} from './static/about/about.component';
import {BlogComponent} from './static/blog/blog.component';
import {Blog1Component} from './static/blog/blog1/blog1.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: '',
    children: [{
      path: 'home', component: HomeComponent
    }, {
      path: 'product', component: ProductDetailComponent
    }, {
      path: 'order', component: OrderComponent
    }, {
      path: 'cart', component: CartDetailComponent
    }, {
      path: 'pro-industry', component: ProIndustryComponent
    }, {
      path: 'about', component: AboutComponent
    }, {
      path: 'blog', component: BlogComponent
    }, {
      path: 'blog-detail-1', component: Blog1Component
    }
    ]
  },
  {path: 'profile', component: ProfileComponent, canActivate: [ApiService]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'not-found', component: NotFoundComponent},
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
