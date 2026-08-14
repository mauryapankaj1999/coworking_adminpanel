import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/CommonTable";
import { useBlogs, useDeleteBlog } from "../../../hooks/useBlog";
import { showSuccess } from "../../../utils/toast";

export default function Blog() {
  const navigate = useNavigate();

  const { data, isLoading } = useBlogs();
  const { mutate: deleteBlogMutation } = useDeleteBlog();

  const blogs = data?.data || [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteBlogMutation(id, {
        onSuccess: () => {
          showSuccess("Blog Deleted Successfully");
        },
      });
    }
  };

  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },

    {
      name: "Image",
      cell: (row) =>
        row.image?.url ? (
          <img
            src={row.image.url}
            alt={row.title}
            className="w-10 h-10 rounded-md object-cover border"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        ),
    },

    {
      name: "Category",
      selector: (row) => row.category?.name || "-",
      sortable: true,
    },

    {
      name: "Created Date",
      selector: (row) =>
        new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },

    {
      name: "Action",
      width: "120px",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(`/blog/edit/${row._id}`)}>
            <MdEdit
              size={20}
              className="text-blue-600 hover:text-blue-800"
            />
          </button>

          <button onClick={() => handleDelete(row._id)}>
            <MdDeleteOutline
              size={20}
              className="text-red-600 hover:text-red-800"
            />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="rounded-xl">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl font-bold">Blogs</h2>

        <button
          onClick={() => navigate("/blog/add")}
          className="bg-primary text-white px-3 py-1 text-[14px] rounded-md"
        >
          Add Blog
        </button>
      </div>

      <CommonTable
        columns={columns}
        data={blogs}
        loading={isLoading}
      />
    </div>
  );
}