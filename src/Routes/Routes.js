import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../Layout/DashboardLayout";
import Main from "../Layout/Main";
import Appointment from "../Pages/Appointments/Appointment/Appointment";
import AddDoctor from "../Pages/Dashboard/AddDoctor/AddDoctor";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import ManageDoctors from "../Pages/Dashboard/ManageDoctors/ManageDoctors";
import MyAppointment from "../Pages/Dashboard/MyAppointment/MyAppointment";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import DisplayError from "../Shared/DisplayError/DisplayError";
import AdminRoute from "./AdminRoutes/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main/>,
        errorElement: <DisplayError />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <SignUp />
            },
            {
                path: "/appointment",
                element: <Appointment />
            },
            
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute> <DashboardLayout /> </PrivateRoute>,
        errorElement: <DisplayError />,
        children: [
            {
                path: "/dashboard",
                element: <MyAppointment />
            },
            {
                path: "/dashboard/allUsers",
                element: <AdminRoute> <AllUsers /> </AdminRoute>
            },
            {
                path: "/dashboard/adddoctor",
                element: <AdminRoute> <AddDoctor /> </AdminRoute>
            },
            {
                path: "/dashboard/managedotors",
                element: <AdminRoute> <ManageDoctors /> </AdminRoute>
            },
            {
                path: "/dashboard/payment/:id",
                loader: ({ params }) => fetch(`http://localhost:5000/bookings/${params.id}`) ,
                element: <AdminRoute> <Payment /> </AdminRoute>
            },
        ]
    }
])

export default router