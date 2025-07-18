import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import {AppLayout} from "./components/common/AppLayout/AppLayout";
import "./App.css";

import { Dashboard } from "./pages/dashboard/Dashboard";
import { IncomingFiles } from "./pages/files/IncomingFiles";
import { ReceivedFiles } from "./pages/files/ReceivedFiles";
import { SentFiles } from "./pages/files/SentFiles";
import { AllFiles } from "./pages/files/AllFiles";
import { CreateFile } from "./pages/files/CreateFile";
import { DepartmentFiles } from "./pages/files/DepartmentFiles";
import { FileDetails } from "./pages/files/FileDetails";
import { AccessDenied } from "./pages/auth/AccessDenied";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { AuditLog } from "./pages/admin/AuditLog";
import { EmployeeDirectory } from "./pages/admin/EmployeeDirectory";
import { UserManagement } from "./pages/admin/UserManagement";
import { BarcodeScanner } from "./pages/files/BarcodeScanner";
import { Settings } from "./pages/profile/Settings";
import { MyProfile } from "./pages/profile/MyProfile";
import { MyFiles } from "./pages/user/MyFiles";
import { SendForwardFile } from "./pages/files/SendForwardFile";
import { Notifications } from "./pages/notification/Notifications";
import { Logs } from "./pages/files/Logs";
import { Track } from "./pages/files/Track";

const App = () => {
    const {user} = useAuth();

    const router = createBrowserRouter([
        {
            path:"/",
            element:<AppLayout />,
            children:[
                {
                    path: "/login",
                    element: user ? <Navigate to="/dashboard" /> : <Login />,
                  },
                  {
                    path: "/signup",
                    element: user ? <Navigate to="/dashboard" /> : <Signup />,
                  },
                {
                  path: "/",
                  element: <Navigate to="/dashboard" />,
                },
                {
                  path: "/dashboard",
                  element: <Dashboard />,
                },
                {
                  path: "/incoming-files",
                  element: <IncomingFiles />,
                },
                {
                  path: "/received-files",
                  element: <ReceivedFiles />,
                },
                {
                  path: "/sent-files",
                  element: <SentFiles />,
                },
                {
                  path: "/all-files",
                  element: user && (user.role === 'admin' || user.role === 'superadmin') ? <AllFiles /> : <AccessDenied />,
                },
                {
                  path: "/create",
                  element: <CreateFile />,
                },
                {
                  path: "/logs",
                  element: <Logs />,
                },
                {
                  path: "/track",
                  element: <Track />,
                },
                {
                  path: "/scanner",
                  element: <BarcodeScanner />,
                },
                {
                  path: "/settings",
                  element: <Settings />,
                },
                {
                  path: "/user-management",
                  element: user && (user.role === 'superadmin' || user.role === 'admin') ? <UserManagement /> : <AccessDenied />,
                },
                {
                  path: "/employee-directory",
                  element: user && (user.role === 'superadmin' || user.role === 'admin') ? <EmployeeDirectory /> : <AccessDenied />,
                },
                {
                  path: "/my-profile",
                  element: <MyProfile />,
                },
                {
                  path: "/file-details",
                  element: <FileDetails />,
                },
                {
                  path: "/send-forward",
                  element: <SendForwardFile />,
                },
                {
                  path: "/notifications",
                  element: <Notifications />,
                },
                {
                  path: "/audit-log",
                  element: user && (user.role === 'superadmin' || user.role === 'auditor') ? <AuditLog /> : <AccessDenied />,
                },
                {
                  path: "/access-denied",
                  element: <AccessDenied />,
                },
                {
                  path: "/department-files",
                  element: user && (user.role === 'admin' || user.role === 'superadmin') ? <DepartmentFiles /> : <AccessDenied />,
                },
                {
                  path: "/my-files",
                  element: user && user.role === 'user' ? <MyFiles /> : <AccessDenied />,
                },

            ]
        },
      ]);


    return(
       <RouterProvider router={router}>
        
       </RouterProvider>
    )
}

export default App;