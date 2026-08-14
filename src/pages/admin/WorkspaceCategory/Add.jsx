import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import HeadingSection from "../../../components/HeadingSection";
import Input from "../../../components/common/Input";

import {
  useCreateCategory,
  useCategory,
  useUpdateCategory,
} from "../../../hooks/useWorkspaceCategory";

import { showError, showSuccess } from "../../../utils/toast";

export default function AddWorkspaceCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: categoryData } = useCategory(id);

  const { mutateAsync: createCategory, isPending } = useCreateCategory();

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
      setValue("description", categoryData.data.description);
    }
  }, [id, categoryData, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = { name: data.name, description: data.description };

      if (id) {
        await updateCategory({ id, data: payload });
        showSuccess("Category Updated Successfully");
      } else {
        await createCategory(payload);
        showSuccess("Category Created Successfully");
      }

      reset();
      navigate("/workspacecategory");
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
        title={id ? "Edit Workspace Category" : "Add Workspace Category"}
        link="/workspace-category"
        btnText="View Categories"
      />

      <div className="bg-white rounded-xl p-6 shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Category Name"
            name="name"
            placeholder="e.g. Flexi Desk"
            register={register}
            error={errors.name}
          />

          <Input
            label="Short Description"
            name="description"
            placeholder="e.g. Any open seat, flexible days"
            register={register}
            error={errors.description}
          />

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