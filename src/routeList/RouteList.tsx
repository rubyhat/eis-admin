import React from "react";
import { Route, Routes } from "react-router-dom";

const ProtectedRoute = React.lazy(() => import("./ProtectedRoute"));
const Home = React.lazy(() => import("../pages/Home"));
const Help = React.lazy(() => import("../pages/Help"));
const Login = React.lazy(() => import("../pages/Login"));
const Catalog = React.lazy(() => import("../pages/Catalog"));
const HelpDetails = React.lazy(() => import("../pages/HelpDetails"));
const CreateEstate = React.lazy(() => import("../pages/CreateEstate"));
const EstateDetails = React.lazy(() => import("../pages/EstateDetails"));

const AccessDenied = React.lazy(() => import("../pages/System/AccessDenied"));
const PageNotFound = React.lazy(() => import("../pages/System/PageNotFound"));

export const RouteList = () => {
  const isAuth = true;

  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/help" element={<Help />} />
      <Route path="/help/:id" element={<HelpDetails />} />

      <Route path="/catalog" element={<Catalog />} />
      <Route path="/catalog/:id" element={<EstateDetails />} />
      <Route path="/catalog/create" element={<CreateEstate />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/access-denied"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <AccessDenied />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
