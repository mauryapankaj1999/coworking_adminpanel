import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IoClose, IoAdd } from "react-icons/io5";

import HeadingSection from "../../../components/HeadingSection";
import Input from "../../../components/common/Input";
import { useSubCategoriesByCategory } from "../../../hooks/useSubCategory";
import {
  useSingleWorkspace,
  useCreateWorkspace,
  useUpdateWorkspace,
} from "../../../hooks/useWorkspace";

import { useCategories } from "../../../hooks/useCategory";
// import { useCreateSubCategory } from "../../../hooks/useSubCategory";

import { showError, showSuccess } from "../../../utils/toast";

const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function AddWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]); // new files
  const [previews, setPreviews] = useState([]); // preview urls (new + existing)
  const [amenityInput, setAmenityInput] = useState("");
  const [communityInput, setCommunityInput] = useState("");

  const { data: workspaceData } = useSingleWorkspace(id);
  const { data: categoriesData } = useCategories();

  const { mutateAsync: createWorkspace, isPending } = useCreateWorkspace();
  const { mutateAsync: updateWorkspace, isPending: updateLoading } =
    useUpdateWorkspace();

  const loading = isPending || updateLoading;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      subCategory: "",
      shortDescription: "",
      description: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      latitude: "",
      longitude: "",
      amenities: [],
      community: [],
      officeTiming: {
        monday: "",
        tuesday: "",
        wednesday: "",
        thursday: "",
        friday: "",
        saturday: "",
        sunday: "",
      },
      plans: [{ title: "", price: "", description: "" }],
      featured: false,
      status: true,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "plans",
  });

  const selectedCategory = watch("category");
  const amenities = watch("amenities");
  const community = watch("community");

  const { data: subCategoriesData } =
    useSubCategoriesByCategory(selectedCategory);

  // Prefill on edit
  useEffect(() => {
    if (id && workspaceData?.data) {
      const w = workspaceData.data;

      setValue("name", w.name);
      setValue("category", w.category?._id || w.category);
      setValue("subCategory", w.subCategory?._id || w.subCategory);
      setValue("shortDescription", w.shortDescription);
      setValue("description", w.description);
      setValue("address", w.address);
      setValue("city", w.city);
      setValue("state", w.state);
      setValue("pincode", w.pincode);
      setValue("latitude", w.latitude);
      setValue("longitude", w.longitude);
      setValue("amenities", w.amenities || []);
      setValue("community", w.community || []);
      setValue("featured", w.featured);
      setValue("status", w.status);

      if (w.officeTiming) {
        days.forEach((day) => {
          setValue(`officeTiming.${day}`, w.officeTiming[day] || "");
        });
      }

      if (w.plans?.length) {
        setValue("plans", w.plans);
      }

      if (w.images?.length) {
        setPreviews(w.images.map((img) => img.url));
      }
    }
  }, [id, workspaceData, setValue]);

  // Image handling
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removeImage = (index) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Amenities tags
  const addAmenity = () => {
    if (!amenityInput.trim()) return;
    setValue("amenities", [...(amenities || []), amenityInput.trim()]);
    setAmenityInput("");
  };

  const removeAmenity = (index) => {
    setValue(
      "amenities",
      amenities.filter((_, i) => i !== index),
    );
  };

  // Community tags
  const addCommunity = () => {
    if (!communityInput.trim()) return;
    setValue("community", [...(community || []), communityInput.trim()]);
    setCommunityInput("");
  };

  const removeCommunity = (index) => {
    setValue(
      "community",
      community.filter((_, i) => i !== index),
    );
  };

  const onSubmit = async (data) => {
    try {
      if (!id && images.length === 0) {
        showError("At least one workspace image is required");
        return;
      }

      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("subCategory", data.subCategory);
      formData.append("shortDescription", data.shortDescription);
      formData.append("description", data.description);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("pincode", data.pincode || "");
      formData.append("latitude", data.latitude || "");
      formData.append("longitude", data.longitude || "");
      formData.append("featured", data.featured);
      formData.append("status", data.status);

      formData.append("plans", JSON.stringify(data.plans));
      formData.append("amenities", JSON.stringify(data.amenities || []));
      formData.append("community", JSON.stringify(data.community || []));
      formData.append("officeTiming", JSON.stringify(data.officeTiming));

      images.forEach((file) => {
        formData.append("images", file);
      });

      if (id) {
        await updateWorkspace({ id, data: formData });
        showSuccess("Workspace Updated Successfully");
      } else {
        await createWorkspace(formData);
        showSuccess("Workspace Created Successfully");
      }

      reset();
      setImages([]);
      setPreviews([]);
      navigate("/workspace");
    } catch (error) {
      console.log(error);
      showError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <HeadingSection
        title={id ? "Edit Workspace" : "Add Workspace"}
        link="/workspace"
        btnText="View Workspaces"
      />

      <div className="bg-white rounded-xl p-6 shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Workspace Name"
              name="name"
              placeholder="Enter Workspace Name"
              register={register}
              error={errors.name}
            />

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option value="">Select Category</option>
                {categoriesData?.data?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Sub Category
              </label>
              <select
                {...register("subCategory", {
                  required: "Sub Category is required",
                })}
                disabled={!selectedCategory}
                className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
              >
                <option value="">Select Sub Category</option>
                {subCategoriesData?.data?.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
              {errors.subCategory && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.subCategory.message}
                </p>
              )}
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Workspace Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="text-sm"
            />

            {previews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {previews.map((src, index) => (
                  <div key={index} className="relative">
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      className="w-24 h-24 rounded-lg object-cover border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <IoClose size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Descriptions */}
          <Input
            label="Short Description"
            name="shortDescription"
            placeholder="Enter Short Description"
            register={register}
            error={errors.shortDescription}
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows={4}
              placeholder="Enter Full Description"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Input
              label="Address"
              name="address"
              placeholder="Enter Address"
              register={register}
              error={errors.address}
            />
            <Input
              label="City"
              name="city"
              placeholder="Enter City"
              register={register}
              error={errors.city}
            />
            <Input
              label="State"
              name="state"
              placeholder="Enter State"
              register={register}
              error={errors.state}
            />
            <Input
              label="Pincode"
              name="pincode"
              placeholder="Enter Pincode"
              register={register}
            />
            <Input
              label="Latitude"
              name="latitude"
              placeholder="Enter Latitude"
              register={register}
            />
            <Input
              label="Longitude"
              name="longitude"
              placeholder="Enter Longitude"
              register={register}
            />
          </div>

          {/* Plans */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Plans</label>
              <button
                type="button"
                onClick={() =>
                  append({ title: "", price: "", description: "" })
                }
                className="flex items-center gap-1 text-sm text-[#184981]"
              >
                <IoAdd /> Add Plan
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-4 gap-3 border rounded-md p-3"
                >
                  <input
                    {...register(`plans.${index}.title`)}
                    placeholder="Plan Title"
                    className="border rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    type="number"
                    {...register(`plans.${index}.price`)}
                    placeholder="Price"
                    className="border rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    {...register(`plans.${index}.description`)}
                    placeholder="Plan Description"
                    className="border rounded-md px-3 py-2 text-sm md:col-span-1"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    className="text-red-500 text-sm disabled:opacity-30"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium mb-1">Amenities</label>
            <div className="flex gap-2">
              <input
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAmenity();
                  }
                }}
                placeholder="Type amenity and press Enter"
                className="flex-1 border rounded-md px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={addAmenity}
                className="bg-[#184981] text-white px-4 rounded-md text-sm"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {amenities?.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 text-sm px-3 py-1 rounded-full"
                >
                  {item}
                  <IoClose
                    className="cursor-pointer"
                    onClick={() => removeAmenity(index)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Community */}
          <div>
            <label className="block text-sm font-medium mb-1">Community</label>
            <div className="flex gap-2">
              <input
                value={communityInput}
                onChange={(e) => setCommunityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCommunity();
                  }
                }}
                placeholder="Type community tag and press Enter"
                className="flex-1 border rounded-md px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={addCommunity}
                className="bg-[#184981] text-white px-4 rounded-md text-sm"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {community?.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 text-sm px-3 py-1 rounded-full"
                >
                  {item}
                  <IoClose
                    className="cursor-pointer"
                    onClick={() => removeCommunity(index)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Office Timing */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Office Timing
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {days.map((day) => (
                <div key={day} className="flex items-center gap-3">
                  <span className="w-24 text-sm capitalize text-gray-600">
                    {day}
                  </span>
                  <input
                    {...register(`officeTiming.${day}`)}
                    placeholder="e.g. 9:00 AM - 6:00 PM"
                    className="flex-1 border rounded-md px-3 py-2 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-8">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("featured")} />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("status")} />
              Active
            </label>
          </div>

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
                ? "Update Workspace"
                : "Save Workspace"}
          </button>
        </form>
      </div>
    </>
  );
}
