// import react from 'react'
// import CommonTable from '../../../components/CommonTable'
// import { useNavigate } from 'react-router-dom';

// export default function Testimonials() {
//   const navigate = useNavigate();
//   return (
//    <>
//    <div className="rounded-xl">
//       <div className="flex justify-between items-center mb-5">
//         <h2 className="text-2xl font-bold">Testimonials</h2>

//         <button
//           onClick={() => navigate("/testimonials/add")}
//           className="bg-primary text-white px-3 py-1 text-[14px] rounded-md"
//         >
//           Add Testimonial
//         </button>
//       </div>

//       {/* <CommonTable
//         columns={columns}
//         data={blogs}
//         loading={isLoading}
//       /> */}
//     </div>
//    </>
//   )
// }
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../../components/CommonTable";
import {
  useTestimonials,
  useDeleteTestimonial,
} from "../../../hooks/useTestimonial";
import { showSuccess } from "../../../utils/toast";

export default function Testimonial() {
  const navigate = useNavigate();

  const { data, isLoading } = useTestimonials();
  const { mutate: deleteTestimonialMutation } =
    useDeleteTestimonial();

  const testimonials = data?.data || [];

  const handleDelete = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this testimonial?"
      )
    ) {
      deleteTestimonialMutation(id, {
        onSuccess: () => {
          showSuccess("Testimonial Deleted Successfully");
        },
      });
    }
  };

  const columns = [
    {
      name: "Name",
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
            className="w-10 h-10 rounded-full object-cover border"
          />
        ) : (
          <span className="text-gray-400">No Image</span>
        ),
    },

    {
      name: "Designation",
      selector: (row) => row.designation || "-",
      sortable: true,
    },

    {
      name: "Company",
      selector: (row) => row.company || "-",
      sortable: true,
    },

    {
      name: "Rating",
      selector: (row) => row.rating || "-",
      sortable: true,
      width: "100px",
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
            onClick={() =>
              navigate(`/testimonials/edit/${row._id}`)
            }
          >
            <MdEdit
              size={20}
              className="text-blue-600 hover:text-blue-800"
            />
          </button>

          <button
            onClick={() => handleDelete(row._id)}
          >
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
        <h2 className="text-2xl font-bold">
          Testimonials
        </h2>

        <button
          onClick={() =>
            navigate("/testimonials/add")
          }
          className="bg-primary text-white px-3 py-1 text-[14px] rounded-md"
        >
          Add Testimonial
        </button>
      </div>

      <CommonTable
        columns={columns}
        data={testimonials}
        loading={isLoading}
      />
    </div>
  );
}