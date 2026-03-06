import { useForm } from "react-hook-form";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Switch } from "@/ui/switch";
import { Button } from "@/ui/Button";
import { Field, FieldLabel } from "@/ui/field";
import { X } from "lucide-react";
import categories from "../../../constants/categories-constant";

import { useEffect, useState } from "react";
import useProduct from "../../../hooks/useProduct";


const BASE_URL = import.meta.env.VITE_BASE_URL;

function ProductForm({ handleVisibile, isEdit, editProduct }) {
  const {  proForm,loading } = useProduct()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: isEdit
      ? { ...editProduct, isActive: editProduct?.isActive ?? true }
      : { isActive: true },
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [showImageInput, setShowImageInput] = useState(!isEdit);

  const selectedImages = watch("images");

  

  useEffect(() => {
    
    if (isEdit && !showImageInput) {
      setImagePreviews(editProduct?.imageList || []);
      return;
    }

    if (!selectedImages || selectedImages.length === 0) {
      setImagePreviews([]);
      return;
    }

    const files = Array.from(selectedImages);
    const objectUrls = files.map((file) => URL.createObjectURL(file));

    setImagePreviews(objectUrls);

    return () => {
      objectUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedImages, isEdit, showImageInput]);



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <form
        onSubmit={handleSubmit((data) => {
          proForm(data, isEdit, editProduct, handleVisibile, reset);
        })}
        className="relative w-[420px] max-h-[90vh] overflow-y-auto rounded-lg border border-border bg-card p-8 space-y-4"
      >
        {/* CLOSE BUTTON */}
        <X
          onClick={() => handleVisibile(false)}
          className="absolute right-4 top-4 cursor-pointer text-primary"
        />

        <h3 className="text-primary font-medium">
          {isEdit ? "Edit Product" : "Add Product"}
        </h3>

        {/* NAME */}
        <Field>
          <FieldLabel>Product Name *</FieldLabel>
          <Input {...register("name", { required: "Product name required" })} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </Field>

        {/* DESCRIPTION */}
        <Field>
          <FieldLabel>Description *</FieldLabel>
          <Textarea
            {...register("description", {
              required: "Description required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description.message}
            </p>
          )}
        </Field>

        {/* PRICE & DISCOUNT */}
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel>Price *</FieldLabel>
            <Input
              type="number"
              {...register("price", {
                required: "Price required",
                min: { value: 1, message: "Must be > 0" },
              })}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </Field>

          <Field>
            <FieldLabel>Discount %</FieldLabel>
            <Input
              type="number"
              {...register("discount", {
                min: { value: 0, message: "Min 0" },
                max: { value: 90, message: "Max 90" },
              })}
            />
          </Field>
        </div>

        {/* STOCK */}
        <Field>
          <FieldLabel>Stock Qty *</FieldLabel>
          <Input
            type="number"
            {...register("stockQty", {
              required: "Stock required",
              min: { value: 0, message: "Min 0" },
            })}
          />
          {errors.stockQty && (
            <p className="text-red-500 text-sm">
              {errors.stockQty.message}
            </p>
          )}
        </Field>

        {/* CATEGORY */}
        <Field>
          <FieldLabel>Category *</FieldLabel>
          <select
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            {...register("category", { required: "Category required" })}
          >
            <option value="">Select category</option>
            {Object.values(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-500 text-sm">
              {errors.category.message}
            </p>
          )}
        </Field>

        {/* IMAGES */}
        <Field>
          <FieldLabel>
            Images *
            {isEdit && !showImageInput && (
              <button
                type="button"
                onClick={() => setShowImageInput(true)}
                className="ml-2 text-sm text-primary underline"
              >
                Edit Images
              </button>
            )}
          </FieldLabel>

          {showImageInput && (
            <Input
              type="file"
              multiple
              accept="image/*"
              {...register("images", {
                required: "Images required",
              })}
            />
          )}

          {errors.images && (
            <p className="text-red-500 text-sm">{errors.images.message}</p>
          )}

          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {imagePreviews.map((img, index) => (
                <img
                  key={index}
                  src={
                    showImageInput || !isEdit
                      ? img
                      : `${BASE_URL}${img}`
                  }
                  alt="preview"
                  className="h-20 w-20 rounded object-cover"
                />
              ))}
            </div>
          )}
        </Field>

        {/* FEATURES */}
        <Field>
          <FieldLabel>Features</FieldLabel>
          <Input placeholder="comma separated" {...register("features")} />
        </Field>

        {/* TAGS */}
        <Field>
          <FieldLabel>Tags</FieldLabel>
          <Input {...register("tags")} />
        </Field>

        {/* ACTIVE SWITCH */}
        <Field
          orientation="horizontal"
          className="flex items-center gap-2"
        >
          <Switch
            checked={watch("isActive")}
            onCheckedChange={(v) => setValue("isActive", v)}
          />
          <FieldLabel>Active</FieldLabel>
        </Field>

        <Button
          disabled={loading || isSubmitting}
          type="submit"
          className="w-full"
        >
          {loading
            ? "Processing..."
            : isEdit
            ? "Update Product"
            : "Add Product"}
        </Button>
      </form>
    </div>
  );
}

export default ProductForm;