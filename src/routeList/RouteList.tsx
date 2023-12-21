import React from "react";
import { Route, Routes } from "react-router-dom";

const ProtectedRoute = React.lazy(() => import("./ProtectedRoute"));
const Home = React.lazy(() => import("../pages/Home"));
const Catalog = React.lazy(() => import("../pages/Catalog"));
const EstateDetails = React.lazy(() => import("../pages/EstateDetails"));

const AccessDenied = React.lazy(() => import("../pages/System/AccessDenied"));
const PageNotFound = React.lazy(() => import("../pages/System/PageNotFound"));

export const RouteList = () => {
  const isAuth = true;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/catalog/:id" element={<EstateDetails />} />

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
