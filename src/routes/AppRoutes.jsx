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
import AddBlog from "../pages/admin/Blog/Add";
import Blogs from "../pages/admin/Blog/Blogs";
import AddTestimonial from "../pages/admin/testimonials/Add";
import Testimonials from "../pages/admin/testimonials/testimonials";
import AddWorkspaceCategory from "../pages/admin/WorkspaceCategory/Add";
import WorkspaceCategory from "../pages/admin/WorkspaceCategory/WorkspaceCategory";
import AddOperator from "../pages/admin/Operator/Add";
import Operator from "../pages/admin/Operator/Operator";
import Enquery from "../pages/admin/Enquery/Enquery";

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
        <Route path="/blog/add" element={<AddBlog />} />
        <Route path="/blog/edit/:id" element={<AddBlog />} />
        <Route path="/blog" element={<Blogs />} />
        <Route path="/testimonials/add" element={<AddTestimonial />} />
        <Route path="/testimonials" element={<Testimonials />} />
        {/* <Route path="/testimonials/add" element={<AddTestimonial />} /> */}
        <Route path="/testimonials/edit/:id" element={<AddTestimonial />} />
        <Route path="/add-workspacecategory" element={<AddWorkspaceCategory />} />
        <Route path="/workspacecategory" element={<WorkspaceCategory />} />
        <Route path="/workspacecategory/edit/:id" element={<AddWorkspaceCategory />} />
        <Route path="/operator/add" element={<AddOperator />} />
        <Route path="/operator/edit/:id" element={<AddOperator />} />
        <Route path="/operator" element={<Operator />} />
        <Route path="/enquery" element={<Enquery />} />

       
        


        

      </Route>
    </Routes>
  );
};

export default AppRoutes;
