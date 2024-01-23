import React from "react";
import { Route, Routes } from "react-router-dom";
import { useLoginStore } from "../modules/LoginModule/store";

const ProtectedRoute = React.lazy(() => import("./ProtectedRoute"));
const Home = React.lazy(() => import("../pages/Home"));
const Help = React.lazy(() => import("../pages/Help"));
const User = React.lazy(() => import("../pages/User"));
const Login = React.lazy(() => import("../pages/Login"));
const Users = React.lazy(() => import("../pages/Users"));
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
      <Route
        path="/"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/users"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:id"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <User />
          </ProtectedRoute>
        }
      />

      <Route
        path="/help"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <Help />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help/:id"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <HelpDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/catalog"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <Catalog />
          </ProtectedRoute>
        }
      />
      <Route
        path="/catalog/:id"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <EstateDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/catalog/create"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <CreateEstate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/access-denied"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <AccessDenied />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/no-auth" element={<NoAuth />} />
      <Route path="/page-not-found" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};
