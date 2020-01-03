const URL_BASE = 'http://localhost:8084';

export const config = {
  category_API: URL_BASE + '/category/getCategory',
  product_API: URL_BASE + '/product/getProduct',
  search_product: URL_BASE + '/product/search',
  img_product: URL_BASE + '/product/image',
  best_sale_API: URL_BASE + '/product/bestSale',
  product_new_API: URL_BASE + '/product/productNew',
  product_detail: URL_BASE + '/product/detail',
  show_order: URL_BASE + '/order/showAll',
  cart_show: URL_BASE + '/cart/show',
  add_cart: URL_BASE + '/cart/addCart',
  get_num_cart: URL_BASE + '/cart/getNum',
  remove_cart: URL_BASE + '/cart/remove'
};
