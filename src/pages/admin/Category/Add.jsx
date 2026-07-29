import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import HeadingSection from "../../../components/HeadingSection";
import Input from "../../../components/common/Input";

import {
  useCreateCategory,
  useSingleCategory,
  useUpdateCategory,
} from "../../../hooks/useCategory";

import { showError, showSuccess } from "../../../utils/toast";

export default function AddCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [preview, setPreview] = useState("");

  const { data: categoryData } = useSingleCategory(id);

  const { mutateAsync: createCategory, isPending } =
    useCreateCategory();

  const { mutateAsync: updateCategory, isPending: updateLoading } =
    useUpdateCategory();

  const loading = isPending || updateLoading;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id && categoryData?.data) {
      setValue("name", categoryData.data.name);

      if (categoryData.data.image?.url) {
        setPreview(categoryData.data.image.url);
      }
    }
  }, [id, categoryData, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      if (id) {
        await updateCategory({
          id,
          data: formData,
        });

        showSuccess("Category Updated Successfully");
      } else {
        if (!data.image?.[0]) {
          showError("Category Image is required");
          return;
        }

        await createCategory(formData);

        showSuccess("Category Created Successfully");
      }

      reset();
      setPreview("");

      navigate("/category");
    } catch (error) {
      console.log(error);

      showError(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <HeadingSection
        title={id ? "Edit Category" : "Add Category"}
        link="/category"
        btnText="View Categories"
      />

      <div className="bg-white rounded-xl p-6 shadow">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Category Name"
            name="name"
            placeholder="Enter Category Name"
            register={register}
            error={errors.name}
          />

          <Input
            type="file"
            label="Category Image"
            name="image"
            register={register}
            error={errors.image}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (file) {
                setPreview(URL.createObjectURL(file));
              }
            }}
          />

          {preview && (
            <img
              src={preview}
              alt="Category Preview"
              className="w-40 h-40 rounded-lg object-cover border"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-primary text-white px-5 py-2 rounded-md"
          >
            {loading
              ? id
                ? "Updating..."
                : "Saving..."
              : id
              ? "Update Category"
              : "Save Category"}
          </button>
        </form>
      </div>
    </>
  );
}