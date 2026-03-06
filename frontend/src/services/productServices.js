// services/productService.js

export const addProductApi = (request, data) => {
  return request("/api/product/seller/add", "POST", data);
};

export const updateProductApi = (request, id, data) => {
  return request(`/api/product/seller/update/?id=${id}`, "PATCH", data);
};
export const featuredProductApi=(request)=>{
    return request("/api/product/featured");
}
export const sellerProductApi=(request)=>{
    return request("/api/product/seller/products","GET");
}
export const deleteProductApi=(request,id)=>{
    return request(`/api/product/seller/delete/?id=${id}`,"DELETE")
}