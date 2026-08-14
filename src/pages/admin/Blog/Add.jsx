import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoClose } from "react-icons/io5";

import HeadingSection from "../../../components/HeadingSection";
import Input from "../../../components/common/Input";
import {
  useSingleBlog,
  useCreateBlog,
  useUpdateBlog,
} from "../../../hooks/useBlog";
import { showError, showSuccess } from "../../../utils/toast";

const quillModules = {
  toolbar: [ 
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["blockquote", "code-block"],
    ["clean"],
  ],
};

export default function AddBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null); // new file
  const [preview, setPreview] = useState(null); // preview url (new or existing)

  const { data: blogData } = useSingleBlog(id);
  const { mutateAsync: createBlog, isPending } = useCreateBlog();
  const { mutateAsync: updateBlog, isPending: updateLoading } =
    useUpdateBlog();

  const loading = isPending || updateLoading;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      Description: "",
    },
  });

  // Prefill on edit
  useEffect(() => {
    if (id && blogData?.data) {
      const b = blogData.data;

      setValue("title", b.title);
      setValue("Description", b.Description);

      if (b.image?.url) {
        setPreview(b.image.url);
      }
    }
  }, [id, blogData, setValue]);

  // Image handling
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
      if (!id && !image) {
        showError("Blog image is required");
        return;
      }

      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("Description", data.Description);

      if (image) {
        formData.append("image", image);
      }

      if (id) {
        await updateBlog({ id, data: formData });
        showSuccess("Blog Updated Successfully");
      } else {
        await createBlog(formData);
        showSuccess("Blog Created Successfully");
      }

      reset();
      setImage(null);
      setPreview(null);
      navigate("/blog");
    } catch (error) {
      console.log(error);
      showError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <HeadingSection
        title={id ? "Edit Blog" : "Add Blog"}
        link="/blog"
        btnText="View Blogs"
      />

      <div className="bg-white rounded-xl p-6 shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}
          <Input
            label="Blog Title"
            name="title"
            placeholder="Enter Blog Title"
            register={register}
            error={errors.title}
          />

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Blog Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm"
            />

            {preview && (
              <div className="relative w-40 mt-3">
                <img
                  src={preview}
                  alt="preview"
                  className="w-40 h-40 rounded-lg object-cover border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <IoClose size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Description - Rich Text Editor */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <Controller
              name="Description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <ReactQuill
                  theme="snow"
                  value={field.value}
                  onChange={field.onChange}
                  modules={quillModules}
                  className="bg-white"
                />
              )}
            />
            {errors.Description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.Description.message}
              </p>
            )}
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
                ? "Update Blog"
                : "Save Blog"}
          </button>
        </form>
      </div>
    </>
  );
}