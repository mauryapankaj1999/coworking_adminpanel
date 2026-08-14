import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import HeadingSection from "../../../components/HeadingSection";
import Input from "../../../components/common/Input";

import { useCategories } from "../../../hooks/useCategory";
import {
  useCreateSubCategory,
  useSingleSubCategory,
  useUpdateSubCategory,
} from "../../../hooks/useSubCategory";

import { showError, showSuccess } from "../../../utils/toast";

export default function AddSubCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [preview, setPreview] = useState("");

  const { data: categories } = useCategories();

  const { data: subCategoryData } = useSingleSubCategory(id);

  const { mutateAsync: createSubCategory, isPending } =
    useCreateSubCategory();

  const {
    mutateAsync: updateSubCategory,
    isPending: updateLoading,
  } = useUpdateSubCategory();

  const loading = isPending || updateLoading;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id && subCategoryData?.data) {
      setValue("category", subCategoryData.data.category?._id);
      setValue("name", subCategoryData.data.name);

      if (subCategoryData.data.image?.url) {
        setPreview(subCategoryData.data.image.url);
      }
    }
  }, [id, subCategoryData, setValue]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("category", data.category);
      formData.append("name", data.name);

      if (data.image?.[0]) {
        formData.append("image", data.image[0]);
      }

      if (id) {
        await updateSubCategory({
          id,
          data: formData,
        });

        showSuccess("Sub Category Updated Successfully");
      } else {
        if (!data.image?.[0]) {
          showError("Image is required");
          return;
        }

        await createSubCategory(formData);

        showSuccess("Sub Category Created Successfully");
      }

      reset();
      setPreview("");

      navigate("/subCategory");
    } catch (error) {
      console.log(error);
      showError(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <>
      <HeadingSection
        title={id ? "Edit Sub Category" : "Add Sub Category"}
        link="/sub-category"
        btnText="View Sub Categories"
      />

      <div className="bg-white rounded-xl p-6 shadow">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Category */}

          <div>
            <label className="block mb-2 text-sm font-medium">
              City
            </label>

            <select
              {...register("category")}
              className="w-full border rounded-md h-11 px-3"
            >
              <option value="">Select City</option>

              {categories?.data?.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                City is required
              </p>
            )}
          </div>

          {/* Name */}

          <Input
            label="Sub Location Name"
            name="name"
            placeholder="Enter Sub Location Name"
            register={register}
            error={errors.name}
          />

          {/* Image */}

          <Input
            type="file"
            label="Image"
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
              alt=""
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
              ? "Update Sub Category"
              : "Save Sub Category"}
          </button>
        </form>
      </div>
    </>
  );
}