const URL_BASE = 'http://localhost:8084';

export const config = {
  routeAPI : URL_BASE,
  pageSize: 15,
  category_API: URL_BASE + '/category/getCategory',
  product_API: URL_BASE + '/product/getProduct',
  search_product: URL_BASE + '/product/search',
  same_product_API: URL_BASE + '/product/sameProduct',
  product_quick_view_API: URL_BASE + '/product/quick-view',
  product_cate_API: URL_BASE + '/category/product-category',
  product_detail: URL_BASE + '/product/detail',
  cart_discount_API: URL_BASE + '/cart/code-discount',
  add_cart: URL_BASE + '/cart/addCart',
  get_num_cart: URL_BASE + '/cart/getNum',
  remove_cart: URL_BASE + '/cart/remove',
  blog_API: URL_BASE + '/blog/getBlog',
  blog_detail_API: URL_BASE + '/blog/detail-blog',
  about_API: URL_BASE + '/about/show-about',
  update_num_cart_API: URL_BASE + '/cart/updateNumCart',
  add_compare_API: URL_BASE + '/compare/add',
  show_compare_API: URL_BASE + '/compare/show',
  data_user_API: URL_BASE + '/account/get-data',
  data_order_API: URL_BASE + '/order/show',
  update_order_API: URL_BASE + '/order/update',
  confirm_order_API: URL_BASE + '/order/confirm',
  wishList_insert_API: URL_BASE + '/wish-list/add',
  show_wish_list_API: URL_BASE + '/wish-list/show',
  delete_wish_list_API: URL_BASE + '/wish-list/delete',


  // admin -API
  get_all_product_admin_API: URL_BASE + '/admin-product/getProduct',
  search_product_admin_API: URL_BASE + '/admin-product/search',
  delete_product_admin_API: URL_BASE + '/admin-product/delete',
  get_all_category_admin_API: URL_BASE + '/admin-category/getCategory',
  get_all_blog_admin_API: URL_BASE + '/admin-blog/getBlog',
  get_some_notification_admin_API: URL_BASE + '/admin-notification/getNotification'
};
