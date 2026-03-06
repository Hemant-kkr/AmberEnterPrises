export const updateCartApi=(request,data)=>{
  return request('/api/cart/cart/update','POST',data);
}
export const fetchCart = (request)=>{
  // return request('/api/buyer/cart')
  return {
    cart:[]
  }
}