import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/CommonTable";
import { useOperators, useDeleteOperator } from "../../../hooks/useOperator";
import { showError, showSuccess } from "../../../utils/toast";

export default function Operator() {
  const navigate = useNavigate();

  const { data, isLoading } = useOperators();
  const { mutate: deleteOperatorMutation } = useDeleteOperator();

  const operators = data?.data || [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this operator?")) {
      deleteOperatorMutation(id, {
        onSuccess: () => showSuccess("Operator Deleted Successfully"),
        onError: () => showError("Failed to delete operator"),
      });
    }
  };

  const columns = [
    {
      name: "Operator Name",
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
          <button onClick={() => navigate(`/operator/edit/${row._id}`)}>
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
        <h2 className="text-2xl font-bold">Operators</h2>

        <button
          onClick={() => navigate("/operator/add")}
          className="bg-primary text-white px-3 text-[14px] py-1 rounded-md"
        >
          Add Operator
        </button>
      </div>

      <CommonTable columns={columns} data={operators} loading={isLoading} />
    </div>
  );
}