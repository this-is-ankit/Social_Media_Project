import { Button } from "@/components/ui/button"
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { LogIn } from "lucide-react"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import MainLayout from "./components/MainLayout"
import Profile from "./components/Profile"
import ChatPage from "./components/ChatPage"
import Explore from "./components/Explore"
import Search from "./components/Search"
import Scrolls from "./components/Scrolls"
import useGetSocket from "./Hooks/useGetSocket"
import ProtectedRoute from "./components/ProtectedRoute"

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/chat',
        element: <ChatPage />
      },
      {
        path: '/explore',
        element: <Explore />
      },
      {
        path: '/search',
        element: <Search />
      },
      {
        path: '/scrolls',
        element: <Scrolls />
      },
      {
        path: "/profile/:id",
        element: <Profile />
      },
    ],
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/register",
    element: <Navigate to="/signup" />
  }

])

function App() {
  useGetSocket();
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  )
}

export default App