import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../pages/ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import { Navigate } from "react-router-dom";
import Category from "../pages/admin/Category/Category";
import AddCategory from "../pages/admin/Category/Add";
import AddsubCategory from "../pages/admin/AddSubCategory/AddSubCategory";
import SubCategory from "../pages/admin/AddSubCategory/SubCategory";
import AddWorkspace from "../pages/admin/Workspace/Add";
import Workspace from "../pages/admin/Workspace/Workspace";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />

      <Route
        element={
          <ProtectedRoute>

            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/add" element={<AddCategory />} />
        <Route path="/category/edit/:id" element={<AddCategory />} />
        <Route path="/addsubcategory" element={<AddsubCategory />} />
        <Route path="/subCategory" element={<SubCategory />} />
        <Route path="/subCategory/edit/:id" element={<AddsubCategory />} />
        <Route path="/workspace/add" element={<AddWorkspace />} />
        <Route path="/workspace" element={<Workspace />} />
        {/* <Route path="/workspace/add" element={<AddWorkspace />} /> */}
        <Route path="/workspace/edit/:id" element={<AddWorkspace />} />
       
        


        

      </Route>
    </Routes>
  );
};

export default AppRoutes;
