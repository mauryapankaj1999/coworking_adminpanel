import react from "react";
import CommonTable from "../../../components/CommonTable";
import { useNavigate } from "react-router-dom";
import { useSubCategories } from "../../../hooks/useSubCategory";
import { MdDeleteOutline, MdEdit } from "react-icons/md";

export default function SubCategory() {
  const navigate = useNavigate();
  const { data: categories, isLoading } = useSubCategories();
  console.log(categories, "asdfasdf");

  const columns = [
    {
      name: "main category",
      selector: (row) => row.category.name,
      sortable: true,
    },
    {
      name: "Sub Category",
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
      selector: (row) => new Date(row.createdAt).toLocaleDateString(),
      sortable: true,
    },

    {
      name: "Action",
      width: "120px",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(`/subCategory/edit/${row._id}`)}>
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
        <h2 className="text-2xl font-bold">Sub Categories</h2>

        <button
          onClick={() => navigate("/addsubcategory")}
          className="bg-primary text-white px-3 text-[14px] py-1 rounded-md"
        >
          Add Sub Category
        </button>
      </div>
      <CommonTable
        columns={columns}
        data={categories?.data || []}
        loading={isLoading}
      />

    </div>
  );
}
