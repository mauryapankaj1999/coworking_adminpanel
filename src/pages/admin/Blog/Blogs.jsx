import react from "react";
import CommonTable from "../../../components/CommonTable";
import { useNavigate } from "react-router-dom";
export default function Blogs() {
    const navigate = useNavigate();
  return (
    <>
      <div className="rounded-xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-900">Sub Categories</h2>

          <button
            onClick={() => navigate("/blog/add")}
            className="bg-primary text-white px-3 text-[14px] py-1 rounded-md"
          >
            Add Blog
          </button>
        </div>
        {/* <CommonTable
          columns={columns}
          data={workspaces?.data || []}
          loading={isLoading}
        /> */}
      </div>
    </>
  );
}
