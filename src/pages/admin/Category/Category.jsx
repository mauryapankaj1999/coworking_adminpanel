import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/CommonTable";
import { useCategories, useDeleteCategory } from "../../../hooks/useCategory";
import { showError } from "../../../utils/toast";

export default function Category() {
  const navigate = useNavigate();

  const { data, isLoading } = useCategories();
  const { mutate: deleteCategoryMutation } = useDeleteCategory();

  const categories = data?.data || [];

  const handleDelete = (id) => {
     if (window.confirm("Are you sure you want to delete this blog?")) {
      deleteCategoryMutation(id);
      showError("Category Deleted Successfully");
    }

  };

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
    },

   {
  name: "Image",
  cell: (row) =>
    row.image?.url ? (
      <img
        src={row.image.url}
        alt={row.name}
        className="w-8 h-8 rounded-full object-cover border"
      />
    ) : (
      <span className="text-gray-400">No Image</span>
    ),
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
          <button
            onClick={() => navigate(`/category/edit/${row._id}`)}
          >
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
        <h2 className="text-2xl font-bold">Categories</h2>

        <button
          onClick={() => navigate("/category/add")}
          className="bg-primary text-white px-3 text-[14px] py-1 rounded-md"
        >
          Add Category
        </button>
      </div>

      <CommonTable
        columns={columns}
        data={categories}
        loading={isLoading}
      />
    </div>
  );
}