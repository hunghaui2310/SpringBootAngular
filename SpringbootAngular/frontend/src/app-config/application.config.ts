const URL_BASE = 'http://localhost:8084';

export const config = {
  routeAPI : URL_BASE,
  pageSize: 15,
  category_API: URL_BASE + '/category/getCategory',
  product_API: URL_BASE + '/product/getProduct',
  search_product: URL_BASE + '/product/search',
  same_product_API: URL_BASE + '/product/sameProduct',
  product_cate_API: URL_BASE + 'category/product-category',
  product_detail: URL_BASE + '/product/detail',
  show_order: URL_BASE + '/order/showAll',
  cart_show: URL_BASE + '/cart/show',
  add_cart: URL_BASE + '/cart/addCart',
  get_num_cart: URL_BASE + '/cart/getNum',
  remove_cart: URL_BASE + '/cart/remove',
  blog_API: URL_BASE + '/blog/getBlog',
  blog_detail_API: URL_BASE + '/blog/detail-blog',
  about_API: URL_BASE + '/about/show-about'
};
