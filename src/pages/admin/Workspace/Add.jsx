import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { IoClose, IoAdd } from "react-icons/io5";
import { AMENITY_OPTIONS } from "../../../constants/amenities";
import HeadingSection from "../../../components/HeadingSection";
import Input from "../../../components/common/Input";
import { useSubCategoriesByCategory } from "../../../hooks/useSubCategory";
import {
  useSingleWorkspace,
  useCreateWorkspace,
  useUpdateWorkspace,
} from "../../../hooks/useWorkspace";
import { useWorkspaceCategories } from "../../../hooks/useWorkspaceCategory";
import { useOperators } from "../../../hooks/useOperator";

import { useCategories } from "../../../hooks/useCategory";
// import { useCreateSubCategory } from "../../../hooks/useSubCategory";

import { showError, showSuccess } from "../../../utils/toast";

export default function AddWorkspace() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState([]); // new files
  const [previews, setPreviews] = useState([]); // preview urls (new + existing)
  const [amenityInput, setAmenityInput] = useState("");
  // const [communityInput, setCommunityInput] = useState("");
  // const [amenityInput, setAmenityInput] = useState("");
  const [mainImages, setMainImages] = useState([]);
  const [mainPreviews, setMainPreviews] = useState([]);
  const [connectivityInput, setConnectivityInput] = useState("");
  const { data: workspaceCategoriesData } = useWorkspaceCategories();
  const { data: operatorsData } = useOperators();
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
      workspaceCategory: "",
      operator: "",
      subCategory: "",
      // shortDescription: "",
      description: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      mapLink: "",
      amenities: [],
      // community: [],
      connectivity: [],
      officeTiming: [{ label: "", value: "" }],
      plans: [{ title: "", price: "", description: "" }],
      featured: false,
      status: true,
    },
  });

  // Plans field array
  const { fields, append, remove } = useFieldArray({
    control,
    name: "plans",
  });

  // Office Timing field array
  const {
    fields: timingFields,
    append: appendTiming,
    remove: removeTiming,
  } = useFieldArray({
    control,
    name: "officeTiming",
  });

  const selectedCategory = watch("category");
  const amenities = watch("amenities");
  // const community = watch("community");
  const connectivity = watch("connectivity");

  const { data: subCategoriesData } =
    useSubCategoriesByCategory(selectedCategory);

  // Prefill on edit
  useEffect(() => {
    if (id && workspaceData?.data) {
      const w = workspaceData.data;

      setValue("name", w.name);
      setValue("category", w.category?._id || w.category);
      setValue("subCategory", w.subCategory?._id || w.subCategory);
      // setValue("shortDescription", w.shortDescription);
      setValue("description", w.description);
      setValue("address", w.address);
      setValue("city", w.city);
      setValue("state", w.state);
      setValue("pincode", w.pincode);
      setValue("mapLink", w.mapLink);
      setValue("amenities", w.amenities || []);
      // setValue("community", w.community || []);
      setValue("connectivity", w.connectivity || []);
      setValue("featured", w.featured);
      setValue(
        "workspaceCategory",
        w.workspaceCategory?._id || w.workspaceCategory || "",
      );
      setValue("operator", w.operator?._id || w.operator || "");
      setValue("status", w.status);

      if (w.officeTiming?.length) {
        setValue("officeTiming", w.officeTiming);
      }

      if (w.plans?.length) {
        setValue("plans", w.plans);
      }

      if (w.images?.length) {
        setPreviews(w.images.map((img) => img.url));
      }
    }
  }, [id, workspaceData?.data?._id]);

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

  const handleMainImageChange = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 5);
    setMainImages(files);
    setMainPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const toggleAmenity = (item) => {
    const current = amenities || [];
    if (current.includes(item)) {
      setValue(
        "amenities",
        current.filter((a) => a !== item),
      );
    } else {
      setValue("amenities", [...current, item]);
    }
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
  const addConnectivity = () => {
    if (!connectivityInput.trim()) return;
    setValue("connectivity", [
      ...(connectivity || []),
      connectivityInput.trim(),
    ]);
    setConnectivityInput("");
  };

  const removeConnectivity = (index) => {
    setValue(
      "connectivity",
      connectivity.filter((_, i) => i !== index),
    );
  };

  // const onSubmit = async (data) => {
  //   try {
  //     if (!id && images.length === 0) {
  //       showError("At least one workspace image is required");
  //       return;
  //     }
  //     if (!id && mainImages.length !== 5) {
  //       showError("Please select exactly 5 main gallery images");
  //       return;
  //     }

  //     mainImages.forEach((file) => {
  //       formData.append("mainImages", file);
  //     });

  //     const formData = new FormData();

  //     formData.append("name", data.name);
  //     formData.append("category", data.category);
  //     formData.append("subCategory", data.subCategory);
  //     // formData.append("shortDescription", data.shortDescription);
  //     formData.append("description", data.description);
  //     formData.append("address", data.address);
  //     formData.append("city", data.city);
  //     formData.append("state", data.state);
  //     formData.append("pincode", data.pincode || "");
  //     formData.append("mapLink", data.mapLink || "");
  //     formData.append("featured", data.featured);
  //     formData.append("status", data.status);
  //     formData.append("workspaceCategory", data.workspaceCategory || "");
  //     formData.append("operator", data.operator || "");
  //     formData.append("plans", JSON.stringify(data.plans));
  //     formData.append("amenities", JSON.stringify(data.amenities || []));
  //     // formData.append("community", JSON.stringify(data.community || []));
  //     formData.append("connectivity", JSON.stringify(data.connectivity || []));
  //     formData.append("officeTiming", JSON.stringify(data.officeTiming));

  //     images.forEach((file) => {
  //       formData.append("images", file);
  //     });

  //     if (id) {
  //       await updateWorkspace({ id, data: formData });
  //       showSuccess("Workspace Updated Successfully");
  //     } else {
  //       await createWorkspace(formData);
  //       showSuccess("Workspace Created Successfully");
  //     }

  //     reset();
  //     setImages([]);
  //     setPreviews([]);
  //     navigate("/workspace");
  //   } catch (error) {
  //     console.log(error);
  //     showError(error?.response?.data?.message || "Something went wrong");
  //   }
  // };


  const onSubmit = async (data) => {
  try {
    if (!id && images.length === 0) {
      showError("At least one workspace image is required");
      return;
    }

    if (!id && mainImages.length !== 5) {
      showError("Please select exactly 5 main gallery images");
      return;
    }

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("subCategory", data.subCategory);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("pincode", data.pincode || "");
    formData.append("mapLink", data.mapLink || "");
    formData.append("featured", data.featured);
    formData.append("status", data.status);
    formData.append("workspaceCategory", data.workspaceCategory || "");
    formData.append("operator", data.operator || "");

    formData.append("plans", JSON.stringify(data.plans));
    formData.append("amenities", JSON.stringify(data.amenities || []));
    formData.append(
      "connectivity",
      JSON.stringify(data.connectivity || [])
    );
    formData.append(
      "officeTiming",
      JSON.stringify(data.officeTiming)
    );

    // Workspace images
    images.forEach((file) => {
      formData.append("images", file);
    });

    // Main gallery images
    mainImages.forEach((file) => {
      formData.append("mainImages", file);
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
    setMainImages([]);
    setMainPreviews([]);

    navigate("/workspace");
  } catch (error) {
    console.log("Workspace submit error:", error);
    console.log("Response:", error?.response?.data);

    showError(
      error?.response?.data?.message || "Something went wrong"
    );
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

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="col-span-1">
                <label className="block text-sm font-medium mb-1">
                  Workspace Category
                </label>
                <select
                  {...register("workspaceCategory")}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select Category</option>
                  {workspaceCategoriesData?.data?.map((wc) => (
                    <option key={wc._id} value={wc._id}>
                      {wc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-1">
                <label className="block text-sm font-medium mb-1">
                  Operator
                </label>
                <select
                  {...register("operator")}
                  className="w-full border rounded-md px-3 py-2 text-sm"
                >
                  <option value="">Select Operator</option>
                  {operatorsData?.data?.map((op) => (
                    <option key={op._id} value={op._id}>
                      {op.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <select
                {...register("category", { required: "City is required" })}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option value="">Select City</option>
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
                Sub Location
              </label>
              <select
                {...register("subCategory", {
                  required: "Sub Location is required",
                })}
                disabled={!selectedCategory}
                className="w-full border rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
              >
                <option value="">Select Sub Location</option>
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

            <Input
              label="Workspace Name"
              name="name"
              placeholder="Enter Workspace Name"
              register={register}
              error={errors.name}
            />
          </div>

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

          <div>
            <label className="block text-sm font-medium mb-1">
              Main Gallery Images (exactly 5)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleMainImageChange}
              className="text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Select exactly 5 images — first one shown large, rest as
              thumbnails
            </p>

            {mainPreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-3">
                {mainPreviews.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    className="w-20 h-20 rounded-lg object-cover border"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Descriptions */}
          {/* <Input
            label="Short Description"
            name="shortDescription"
            placeholder="Enter Short Description"
            register={register}
            error={errors.shortDescription}
          /> */}

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
              label="Google Maps Link"
              name="mapLink"
              placeholder="Paste Google Maps share link"
              register={register}
            />
          </div>
          {/* Connectivity */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Connectivity
            </label>
            <div className="flex gap-2">
              <input
                value={connectivityInput}
                onChange={(e) => setConnectivityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addConnectivity();
                  }
                }}
                placeholder="e.g. Metro, E-Rickshaw"
                className="flex-1 border rounded-md px-3 py-2 text-sm"
              />
              <button
                type="button"
                onClick={addConnectivity}
                className="bg-[#184981] text-white px-4 rounded-md text-sm"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {connectivity?.map((item, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-gray-100 text-sm px-3 py-1 rounded-full"
                >
                  {item}
                  <IoClose
                    className="cursor-pointer"
                    onClick={() => removeConnectivity(index)}
                  />
                </span>
              ))}
            </div>
          </div>

          {/* Plans */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Seat Details</label>
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
          {/* <div>
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
           */}

          <div>
            <label className="block text-sm font-medium mb-2">Amenities</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {AMENITY_OPTIONS.map((item) => {
                const checked = amenities?.includes(item);
                return (
                  <label
                    key={item}
                    className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm cursor-pointer transition ${
                      checked
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleAmenity(item)}
                      className="accent-primary"
                    />
                    {item}
                  </label>
                );
              })}
            </div>

            {/* Custom amenity add karne ka option, agar list me na ho */}
            <div className="mt-3 flex gap-2">
              <input
                value={amenityInput}
                onChange={(e) => setAmenityInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addAmenity();
                  }
                }}
                placeholder="Other amenity? Type and press Enter"
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

            {/* Custom-added amenities jo list me nahi hain, unke liye tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {amenities
                ?.filter((a) => !AMENITY_OPTIONS.includes(a))
                .map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-gray-100 text-sm px-3 py-1 rounded-full"
                  >
                    {item}
                    <IoClose
                      className="cursor-pointer"
                      onClick={() => removeAmenity(amenities.indexOf(item))}
                    />
                  </span>
                ))}
            </div>
          </div>

          {/* Community */}
          {/* <div>
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
          </div> */}

          {/* Office Timing */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">Office Timing</label>
              <button
                type="button"
                onClick={() => appendTiming({ label: "", value: "" })}
                className="flex items-center gap-1 text-sm text-[#184981]"
              >
                <IoAdd /> Add Timing
              </button>
            </div>

            <div className="space-y-3">
              {timingFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 md:grid-cols-3 gap-3 border rounded-md p-3"
                >
                  <input
                    {...register(`officeTiming.${index}.label`)}
                    placeholder="e.g. Mon - Fri"
                    className="border rounded-md px-3 py-2 text-sm"
                  />
                  <input
                    {...register(`officeTiming.${index}.value`)}
                    placeholder="e.g. 9:00 AM - 6:00 PM"
                    className="border rounded-md px-3 py-2 text-sm md:col-span-1"
                  />
                  <button
                    type="button"
                    onClick={() => removeTiming(index)}
                    disabled={timingFields.length === 1}
                    className="text-red-500 text-sm disabled:opacity-30"
                  >
                    Remove
                  </button>
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
