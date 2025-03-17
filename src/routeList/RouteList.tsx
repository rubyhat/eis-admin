import React from "react";
import { Route, Routes } from "react-router-dom";
import { useLoginStore } from "../modules/LoginModule/store";

const ProtectedRoute = React.lazy(() => import("./ProtectedRoute"));
const Home = React.lazy(() => import("../pages/Home"));
const Help = React.lazy(() => import("../pages/Help"));
const User = React.lazy(() => import("../pages/User"));
const Login = React.lazy(() => import("../pages/Login"));
const Users = React.lazy(() => import("../pages/Users"));
const Orders = React.lazy(() => import("../pages/Orders"));
const Catalog = React.lazy(() => import("../pages/Catalog"));
const UserEdit = React.lazy(() => import("../pages/UserEdit"));
const UserCreate = React.lazy(() => import("../pages/UserCreate"));
const EditEstate = React.lazy(() => import("../pages/EditEstate"));
const HelpDetails = React.lazy(() => import("../pages/HelpDetails"));
const CreateEstate = React.lazy(() => import("../pages/CreateEstate"));
const EstateDetails = React.lazy(() => import("../pages/EstateDetails"));

const SellOrders = React.lazy(() => import("../pages/Orders/SellOrders"));
const SellOrdersDetails = React.lazy(
  () => import("../pages/Orders/SellOrdersDetails"),
);

const FeedbackOrders = React.lazy(() => import("../pages/Orders/Feedback"));
const EditOrdersFeedback = React.lazy(
  () => import("../pages/EditOrdersFeedback"),
);

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
        path="/users/create"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <UserCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/edit"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <UserEdit />
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
        path="/estate/edit"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <EditEstate />
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
        path="/estate/create"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <CreateEstate />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/feedback"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <FeedbackOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/sell"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <SellOrders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/sell/:id"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <SellOrdersDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders/feedback/edit"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <EditOrdersFeedback />
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
