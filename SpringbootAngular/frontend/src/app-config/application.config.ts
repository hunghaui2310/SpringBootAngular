const URL_BASE = 'http://localhost:8084';

export const config = {
  routeAPI : URL_BASE,
  pageSize: 15,
  category_API: URL_BASE + '/category/getCategory',
  product_API: URL_BASE + '/product/getProduct',
  get_name_product: URL_BASE + '/product/getNameProduct',
  search_product: URL_BASE + '/product/search',
  same_product_API: URL_BASE + '/product/sameProduct',
  getProById_API: URL_BASE + '/product/detailById',
  buy_now_API: URL_BASE + '/product/buy-now',
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
  get_and_update_cartNum_API: URL_BASE + '/cart/update',
  add_compare_API: URL_BASE + '/compare/add',
  show_compare_API: URL_BASE + '/compare/show',
  data_user_API: URL_BASE + '/account/get-data',
  update_user_API: URL_BASE + '/account/update',
  data_order_API: URL_BASE + '/order/show',
  save_order_API: URL_BASE + '/order/save',
  get_all_order: URL_BASE + '/order/getByUser',
  delete_order_API: URL_BASE + '/order/delete',
  update_order_API: URL_BASE + '/order/update',
  confirm_order_API: URL_BASE + '/order/confirm',
  wishList_insert_API: URL_BASE + '/wish-list/add',
  show_wish_list_API: URL_BASE + '/wish-list/show',
  delete_wish_list_API: URL_BASE + '/wish-list/delete',
  show_comment_product_API: URL_BASE + '/comment/getByProduct',
  saveCommentProduct_API: URL_BASE + '/comment/saveCommentProduct',
  editComment_API: URL_BASE + '/comment/updateComment',
  getCommentById_API: URL_BASE + '/comment/getById',
  getCommentByBlog_API: URL_BASE + '/comment/getByBlog',
  deleteComment_API: URL_BASE + '/comment/delete',
  forgot_password_API: URL_BASE + '/mail/forgot-password',
  login_API: URL_BASE + '/account/login',

  // admin -API
  get_all_product_admin_API: URL_BASE + '/admin-product/getProduct',
  search_product_admin_API: URL_BASE + '/admin-product/search',
  delete_product_admin_API: URL_BASE + '/admin-product/delete',
  create_product_admin_API: URL_BASE + '/admin-product/create',
  update_product_admin_API: URL_BASE + '/admin-product/update',
  get_all_category_admin_API: URL_BASE + '/admin-category/getCategory',
  create_category_admin_API: URL_BASE + '/admin-category/create',
  get_all_blog_admin_API: URL_BASE + '/admin-blog/getBlog',
  get_some_notification_admin_API: URL_BASE + '/admin-notification/getNotification'
};
