// import react from "react";
// export default function WorkspaceCategory() {
//   return (
//     <div>
//       <h1>Workspace Category</h1>
//     </div>
//   );
// }

import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/CommonTable";
import {
  useWorkspaceCategories,
  useWorkspaceDeleteCategory,
} from "../../../hooks/useWorkspaceCategory";
import { showError, showSuccess } from "../../../utils/toast";

export default function WorkspaceCategory() {
  const navigate = useNavigate();

  const { data, isLoading } = useWorkspaceCategories();
  const { mutate: deleteCategoryMutation } = useWorkspaceDeleteCategory();

  const categories = data?.data || [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategoryMutation(id, {
        onSuccess: () => showSuccess("Category Deleted Successfully"),
        onError: () => showError("Failed to delete category"),
      });
    }
  };

  const columns = [
    {
      name: "Category Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description || "-",
    },
    {
      name: "Created Date",
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Action",
      width: "120px",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/workspacecategory/edit/${row._id}`)}
          >
            <MdEdit size={20} className="text-blue-600 hover:text-blue-800" />
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
        <h2 className="text-2xl font-bold">Workspace Categories</h2>

        <button
          onClick={() => navigate("/add-workspacecategory")}
          className="bg-primary text-white px-3 text-[14px] py-1 rounded-md"
        >
          Add Category
        </button>
      </div>

      <CommonTable columns={columns} data={categories} loading={isLoading} />
    </div>
  );
}