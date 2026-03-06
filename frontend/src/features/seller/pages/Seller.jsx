import { Button } from "@/ui/button";
import { useState } from "react";
import ProductForm from "../components/ProductForm";
import SellerAnalytics from "../components/SellerAnalytics";
function Seller() {
    const [active,setActive]=useState(false);
    const [isEdit,setIsEdit]=useState(false);
    const [editProduct,setEditProduct]=useState(null);
    const [deleteProduct,setDeleteProduct]=useState(null);  
    const handleEdit=(value,p)=>{
        setIsEdit(value);
        setEditProduct(p);
    }   
    function handleVisibile(e){
      setIsEdit(false);
        setActive(e);
    }
    function handleDelete(id){
      setDeleteProduct(id); 
    }
  return (
    <>
      <div className="mb-8 flex items-center justify-between mt-10 mx-[5%]">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">
          Seller Dashboard
        </h1>
        <Button onClick={()=>{handleVisibile(true)}} variant={'default'} size={"lg"}>
         + Add Product
        </Button>
        {active && !isEdit && (<ProductForm handleVisibile={handleVisibile}/>)}
        {isEdit && !active &&  (<ProductForm handleVisibile={handleVisibile} isEdit={true} editProduct={editProduct}/>)}
      </div>
      <SellerAnalytics handleEdit={handleEdit} handleDelete={handleDelete} isEdit={isEdit} />
    </>
  );
}
export default Seller;
