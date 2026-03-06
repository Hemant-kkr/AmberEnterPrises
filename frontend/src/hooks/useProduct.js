import { useContext, useCallback } from "react";
import useApi from "./useApi";
import { toast } from "sonner";
import { ProductContext } from "../store/ProductContext.jsx";
import { AuthContext } from "../store/AuthContext.jsx";

import {
  addProductApi,
  updateProductApi,
  featuredProductApi,
  deleteProductApi,
  sellerProductApi,
} from "../services/productServices.js";

function useProduct() {
  const { request, loading, error } = useApi();

  const { products, setProducts, sellerProducts, setSellerProducts } = useContext(ProductContext);

  const { user } = useContext(AuthContext);


  const handleProduct = useCallback(async (isEdit, editProduct, data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "images") {
        Array.from(data.images).forEach((img) =>
          formData.append("images", img)
        );
      } else {
        formData.append(key, data[key]);
      }
    }

    const result = isEdit
      ? await updateProductApi(request, editProduct._id, formData)
      : await addProductApi(request, formData);

    return result;
  }, [request]);


  const getProducts = useCallback(async () => {
    try {
      const result = await featuredProductApi(request);
      setProducts(result.products);
    } catch (err) {
      const message =
        err.response?.data?.message || "Fetching products failed";
      toast.error(message);
    }
  }, [request, setProducts]);


  const getSellerProducts = useCallback(async () => {
    try {
      if (user?.role !== "seller") return;

      const result = await sellerProductApi(request);
      setSellerProducts(result.sellerProducts);
    } catch (err) {
      const message =
        err.response?.data?.message || "Fetching seller products failed";
      toast.error(message);
    }
  }, [request, user, setSellerProducts]);


  const deleteProductHandler = useCallback(async (id) => {
    try {
      const result = await deleteProductApi(request, id);

      if (result) {
        toast.success(result.message);
        getSellerProducts();
        getProducts();
      }
    } catch (err) {
      const message = err.response?.data?.message || "Delete failed";
      toast.error(message);
    }
  }, [request, getSellerProducts, getProducts]);

  async function proForm(
    data,
    isEdit = false,
    editProduct = null,
    handleVisible,
    reset
  ) {
    try {
      const result = await handleProduct(isEdit, editProduct, data);

      if (result) {
        toast.success(result.message);

        if (!isEdit) {
          setSellerProducts((prev) => [result.product, ...prev]);
          getProducts();
        } else {
          getSellerProducts();
        }

        reset();
        handleVisible(false);
      }
    } catch (err) {
      const message =
        err.response?.data?.message || "Adding/Updating product failed";
      toast.error(message);
    }
  }


  // useEffect(() => {
  //   getProducts();

  //   if (user) {
  //     getSellerProducts();
  //   }
  // }, [user]);

  return {
    products,
    sellerProducts,
    proForm,
    getProducts,
    getSellerProducts,
    deleteProductHandler,
    loading,
    error,
  };
}

export default useProduct;