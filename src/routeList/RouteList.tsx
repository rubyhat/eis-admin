import React from "react";
import { Route, Routes } from "react-router-dom";
import { useLoginStore } from "../modules/LoginModule/store";

const ProtectedRoute = React.lazy(() => import("./ProtectedRoute"));
const Home = React.lazy(() => import("../pages/Home"));
const Help = React.lazy(() => import("../pages/Help"));
const Login = React.lazy(() => import("../pages/Login"));
const Catalog = React.lazy(() => import("../pages/Catalog"));
const HelpDetails = React.lazy(() => import("../pages/HelpDetails"));
const CreateEstate = React.lazy(() => import("../pages/CreateEstate"));
const EstateDetails = React.lazy(() => import("../pages/EstateDetails"));

const NoAuth = React.lazy(() => import("../pages/System/NoAuth"));
const AccessDenied = React.lazy(() => import("../pages/System/AccessDenied"));
const PageNotFound = React.lazy(() => import("../pages/System/PageNotFound"));

export const RouteList = () => {
  const { isAuth } = useLoginStore((state) => state);

  return (
    <Routes>
      {/* <Route path="/" element={<Home />} /> */}
      <Route
        path="/"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <Home />
          </ProtectedRoute>
        }
      />

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
      <Route path="/no-auth" element={<NoAuth />} />
      <Route path="/page-not-found" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
