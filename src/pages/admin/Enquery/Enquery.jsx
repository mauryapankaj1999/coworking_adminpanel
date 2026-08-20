// import React from "react";
// import { useEnquiries } from "../../../hooks/useEnquiry";
// // import { useEnquiries } from "../hooks/useEnquiry";

// export default function Enquery() {
//   const {
//     data,
//     isLoading,
//     isError,
//     error,
//   } = useEnquiries();

//   const enquiries = data?.data || [];

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     return <div>{error?.message || "Something went wrong"}</div>;
//   }

//   return (
//     <div>
//       <h1>Enquiry</h1>

//       {enquiries.map((item) => (
//         <div key={item._id}>
//           <p>Name: {item.name}</p>
//           <p>Email: {item.email}</p>
//           <p>Phone: {item.phone}</p>
//           <p>Space Type: {item.spaceType}</p>
//           <p>Seats: {item.seats}</p>
//           <p>Workspace: {item.workspaceName}</p>
//           <p>Operator: {item.operatorName}</p>
//           <p>Location: {item.location}</p>
//           <p>Status: {item.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import { MdDeleteOutline, MdVisibility } from "react-icons/md";
import CommonTable from "../../../components/CommonTable";
import {
  useEnquiries,
  useDeleteEnquiry,
  useUpdateEnquiryStatus,
} from "../../../hooks/useEnquiry";
import { showSuccess } from "../../../utils/toast";

export default function Enquery() {
  const { data, isLoading } = useEnquiries();

  const { mutate: deleteEnquiryMutation } = useDeleteEnquiry();
  const { mutate: updateStatusMutation } = useUpdateEnquiryStatus();

  const enquiries = data?.data || [];

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      deleteEnquiryMutation(id, {
        onSuccess: () => {
          showSuccess("Enquiry Deleted Successfully");
        },
      });
    }
  };

  const handleStatusChange = (id, status) => {
    updateStatusMutation(
      {
        id,
        status,
      },
      {
        onSuccess: () => {
          showSuccess("Enquiry Status Updated Successfully");
        },
      }
    );
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name || "-",
      sortable: true,
    },

    {
      name: "Email",
      selector: (row) => row.email || "-",
      sortable: true,
    },

    {
      name: "Phone",
      selector: (row) => row.phone || "-",
      sortable: true,
    },

    {
      name: "Space Type",
      selector: (row) => row.spaceType || "-",
      sortable: true,
    },

    {
      name: "Seats",
      selector: (row) => row.seats || "-",
      sortable: true,
    },

    {
      name: "Workspace",
      selector: (row) => row.workspaceName || "-",
      sortable: true,
    },

    {
      name: "Location",
      selector: (row) => row.location || "-",
      sortable: true,
    },

    {
      name: "Status",
      cell: (row) => (
        <select
          value={row.status}
          onChange={(e) =>
            handleStatusChange(row._id, e.target.value)
          }
          className={`px-2 py-1 rounded-md text-sm border outline-none ${
            row.status === "new"
              ? "bg-blue-50 text-blue-600 border-blue-200"
              : row.status === "contacted"
              ? "bg-yellow-50 text-yellow-600 border-yellow-200"
              : "bg-green-50 text-green-600 border-green-200"
          }`}
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="closed">Closed</option>
        </select>
      ),
    },

    {
      name: "Created Date",
      selector: (row) =>
        row.createdAt
          ? new Date(row.createdAt).toLocaleDateString()
          : "-",
      sortable: true,
    },

    {
      name: "Action",
      width: "100px",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              console.log("View enquiry:", row._id)
            }
          >
            <MdVisibility
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
        <h2 className="text-2xl font-bold">Enquiries</h2>
      </div>

      <CommonTable
        columns={columns}
        data={enquiries}
        loading={isLoading}
      />
    </div>
  );
}