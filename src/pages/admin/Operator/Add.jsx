import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

import HeadingSection from "../../../components/HeadingSection";
import Input from "../../../components/common/Input";

import {
  useCreateOperator,
  useOperator,
  useUpdateOperator,
} from "../../../hooks/useOperator";

import { showError, showSuccess } from "../../../utils/toast";

export default function AddOperator() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: operatorData } = useOperator(id);

  const { mutateAsync: createOperator, isPending } = useCreateOperator();

  const { mutateAsync: updateOperator, isPending: updateLoading } =
    useUpdateOperator();

  const loading = isPending || updateLoading;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id && operatorData?.data) {
      setValue("name", operatorData.data.name);
      setValue("description", operatorData.data.description);
    }
  }, [id, operatorData, setValue]);

  const onSubmit = async (data) => {
    try {
      const payload = { name: data.name, description: data.description };

      if (id) {
        await updateOperator({ id, data: payload });
        showSuccess("Operator Updated Successfully");
      } else {
        await createOperator(payload);
        showSuccess("Operator Created Successfully");
      }

      reset();
      navigate("/operator");
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
        title={id ? "Edit Operator" : "Add Operator"}
        link="/operator"
        btnText="View Operators"
      />

      <div className="bg-white rounded-xl p-6 shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Operator Name"
            name="name"
            placeholder="e.g. WeWork"
            register={register}
            error={errors.name}
          />

          <Input
            label="Description"
            name="description"
            placeholder="Short description about the operator"
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
              ? "Update Operator"
              : "Save Operator"}
          </button>
        </form>
      </div>
    </>
  );
}