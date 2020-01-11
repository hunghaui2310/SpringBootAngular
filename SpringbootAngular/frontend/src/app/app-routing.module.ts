import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home/home.component';
import {LoginComponent} from './account/login/login.component';
import {RegisterComponent} from './account/register/register.component';
import {LogoutComponent} from './account/logout/logout.component';
import {NotFoundComponent} from './account/not-found/not-found.component';
import {ProfileComponent} from './account/profile/profile.component';
import {ApiService} from '../api.service';
import {SingleItemComponent} from './product/single-item/single-item.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: '',
    children: [{
      path: 'home', component: HomeComponent, data: { title: 'Trang chủ'}
     }, {
       path: 'detail/:id', component: SingleItemComponent, data: { title: 'Chi tiết sản phẩm'}
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
