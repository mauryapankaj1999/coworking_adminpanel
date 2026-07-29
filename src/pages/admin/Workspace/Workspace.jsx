import React from "react";
import { useNavigate } from "react-router-dom";
import { useWorkspaces } from "../../../hooks/useWorkspace";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import CommonTable from "../../../components/CommonTable";

export default function Workspace() {
      const navigate = useNavigate();
      const { data: workspaces, isLoading } = useWorkspaces();
      console.log(workspaces, "workspace");

  const columns = [
    {
      name: "Location",
      selector: (row) => row.category.name,
      sortable: true,
    },
    {
      name: "Sub Location",
      selector: (row) => row.subCategory.name,
      sortable: true,
    },
    {
      name: "Workspace Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Sort Description",
      selector: (row) => row.shortDescription,
      sortable: true,
        width: "250px",


    },
    {
      name: "Price",
        selector: (row) => row.plans?.[0]?.price || "-",

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
          <button
            onClick={() => navigate(`/workspace/edit/${row._id}`)}
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
    <>
      <div className="rounded-xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl font-bold">Sub Categories</h2>

          <button
            onClick={() => navigate("/workspace/add")}
            className="bg-primary text-white px-3 text-[14px] py-1 rounded-md"
          >
            Add Workspace
          </button>
        </div>
        <CommonTable
          columns={columns}
          data={workspaces?.data || []}
          loading={isLoading}
        />
      </div>
    </>
  );
}
