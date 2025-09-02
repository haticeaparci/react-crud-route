import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Login from "../pages/auth/Login";
import Contact from "../pages/contact/Contact";
import Register from "../pages/auth/Register";
import FriendsDetail from "../pages/friends/FriendsDetail";
import FriendsPage from "../pages/friends/FriendsPage";
import ProductDetail from "../pages/products/ProductDetail";
import EventList from "../pages/events/EventList";
import EventDetail from "../pages/events/EventDetail";
import EventEdit from "../pages/events/EventEdit";
import EventNew from "../pages/events/EventNew";
import EventLayout from "../pages/events/EventLayout";
import Markets from "../pages/about/Markets";
import Management from "../pages/about/Management";
import Career from "../pages/about/Career";
import AuthLayout from "../pages/auth/AuthLayout";
import { eventsLoader } from "../pages/events/events.loader";
import { eventAction } from "../pages/events/events.action";
import { eventsDetailLoader } from "../pages/events/events.loader";
import { friendsLoader, productsLoader } from "../routes/loader";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import ProductsPage from "../pages/products/ProductsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "about-us",
        element: <About />,
        children: [
          {
            path: "markets",
            element: <Markets />,
          },
          {
            path: "management",
            element: <Management />,
          },
          {
            path: "career",
            element: <Career />,
          },
        ],
      },
      {
        path: "contact",
        element: <Contact />,
      },

      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "friends",
        children: [
          {
            index: true,
            element: <FriendsPage />,
            loader: friendsLoader,
          },
          {
            path: ":friendId",
            element: (
              <ProtectedRoute>
                <FriendsDetail />
              </ProtectedRoute>
            ),
            loader: friendsLoader,
          },
        ],
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProductsPage />,
            loader: productsLoader,
          },
          {
            path: ":productId",
            element: (
              <ProtectedRoute>
                <ProductDetail />
              </ProtectedRoute>
            ),
            loader: productsLoader,
          },
        ],
      },
      {
        path: "events",
        element: <EventLayout />,
        children: [
          {
            index: true,
            element: <EventList />,
            loader: eventsLoader,
          },
          {
            path: "new",
            element: (
              <ProtectedRoute>
                <EventNew />
              </ProtectedRoute>
            ),
            action: eventAction,
          },
          {
            path: ":eventId",
            element: <EventDetail />,
            loader: eventsDetailLoader,
            action: eventAction,
          },

          {
            path: ":eventId/edit",
            element: (
              <ProtectedRoute>
                <EventEdit />
              </ProtectedRoute>
            ),
            loader: eventsDetailLoader,
            action: eventAction,
          },
        ],
      },
    ],
  },
]);

export default router;
