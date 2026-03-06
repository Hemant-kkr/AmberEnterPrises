import { useContext, useEffect } from "react";
import { ProductContext } from "../../../store/ProductContext";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Edit, Trash2 } from "lucide-react";
import { Package, ShoppingBag, DollarSign } from "lucide-react";
import { ShieldLoader } from "@/ui/SheildLoader.jsx";
import useProduct from "../../../hooks/useProduct";



function SellerAnalytics({handleEdit,}) {
        const   orders = [];
        const totalEarnings = [];   
    const { sellerProducts} = useContext(ProductContext);
    const { loading, deleteProductHandler,getSellerProducts } = useProduct();
useEffect(()=> {
 getSellerProducts();
},[])
  return (
    <>{loading &&(<ShieldLoader/>)} 
    <div className="container mx-auto px-4 py-8">  
     <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <Package className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">My Products</p>
                <p className="text-2xl font-bold text-foreground">{sellerProducts.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <ShoppingBag className="h-8 w-8 text-accent" />
              <div>
                <p className="text-sm text-muted-foreground">Orders Received</p>
                <p className="text-2xl font-bold text-foreground">{orders.length}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                <p className="text-2xl font-bold text-foreground">${totalEarnings.length}</p>
              </div>
            </div>
          </div>
        </div>
     <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <h2 className="font-semibold text-foreground">My Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Product</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Category</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Price</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Stock</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellerProducts.map((p) => (
                  <tr key={p._id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{p.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{p.category || "—"}</td>
                    <td className="px-4 py-3 text-foreground">${Number(p.price).toFixed(2)}</td>
                    <td className="px-4 py-3 text-foreground">{p.stockQty}</td>
                    <td className="px-4 py-3">
                      <Badge variant={p.isActive ? "default" : "secondary"}>
                        {p.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(true, p)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteProductHandler(p._id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {sellerProducts.length === 0 && (
                  <tr>
                    <td key="no-products" colSpan={6} className="px-4 py-8 text-center text-muted-foreground">
                      No products yet. Click "Add Product" to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
    </div>
    </>
   
 
  );
}

export default SellerAnalytics;