import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";

import HeadingSection from "../../../components/HeadingSection";
import Input from "../../../components/common/Input";

import {
  useSingleTestimonial,
  useCreateTestimonial,
  useUpdateTestimonial,
} from "../../../hooks/useTestimonial";

import { showError, showSuccess } from "../../../utils/toast";

export default function AddTestimonial() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const { data: testimonialData } = useSingleTestimonial(id);

  const { mutateAsync: createTestimonial, isPending } =
    useCreateTestimonial();

  const { mutateAsync: updateTestimonial, isPending: updateLoading } =
    useUpdateTestimonial();

  const loading = isPending || updateLoading;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      designation: "",
      company: "",
      rating: 5,
      status: true,
    },
  });

  useEffect(() => {
    if (id && testimonialData?.data) {
      const t = testimonialData.data;

      setValue("name", t.name);
      setValue("description", t.description);
      setValue("designation", t.designation);
      setValue("company", t.company);
      setValue("rating", t.rating);
      setValue("status", t.status);

      if (t.image?.url) {
        setPreview(t.image.url);
      }
    }
  }, [id, testimonialData, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("designation", data.designation);
      formData.append("company", data.company);
      formData.append("rating", data.rating);
      formData.append("status", data.status);

      if (image) {
        formData.append("image", image);
      }

      if (id) {
        await updateTestimonial({
          id,
          formData,
        });

        showSuccess("Testimonial Updated Successfully");
      } else {
        await createTestimonial(formData);

        showSuccess("Testimonial Created Successfully");
      }

      reset();
      setImage(null);
      setPreview(null);

      navigate("/testimonial");
    } catch (error) {
      showError(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <>
      <HeadingSection
        title={id ? "Edit Testimonial" : "Add Testimonial"}
        link="/testimonial"
        btnText="View Testimonials"
      />

      <div className="bg-white rounded-xl p-6 shadow">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Input
            label="Name"
            name="name"
            placeholder="Enter Name"
            register={register}
            error={errors.name}
            validation={{
              required: "Name is required",
            }}
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>

            <textarea
              rows={5}
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full border rounded-lg p-3"
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <Input
            label="Designation"
            name="designation"
            placeholder="Enter Designation"
            register={register}
          />

          <Input
            label="Company"
            name="company"
            placeholder="Enter Company"
            register={register}
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Rating
            </label>

            <select
              {...register("rating")}
              className="w-full border rounded-lg p-3"
            >
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Status
            </label>

            <select
              {...register("status")}
              className="w-full border rounded-lg p-3"
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

            {preview && (
              <div className="relative mt-3 w-40">
                <img
                  src={preview}
                  className="w-40 h-40 rounded-lg object-cover border"
                  alt=""
                />

                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <IoClose size={15} />
                </button>
              </div>
            )}
          </div>

          <button
            disabled={loading}
            className="bg-primary text-white px-6 py-2 rounded-md"
          >
            {loading
              ? id
                ? "Updating..."
                : "Saving..."
              : id
              ? "Update Testimonial"
              : "Save Testimonial"}
          </button>
        </form>
      </div>
    </>
  );
}