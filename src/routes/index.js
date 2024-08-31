import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthLayouts from "../layout";
import RegisterPage from "../components/RegisterPage";
import Home from "../components/Home";
import MessagePage from "../components/MessagePage";
import Main from "../components/Main";


const router = createBrowserRouter([
    {
        path : "/",
        element : <Main/>
    },
    {
        path : "/register",
        element : <AuthLayouts><RegisterPage/></AuthLayouts>
    },
{
    path : "/home",
    element : <App/>,
    children : [
        {
            path : "",
            element : <Home/>,
            children : [
                {
                    path : ':userId',
                    element : <MessagePage/>
                }
            ]
        }
    ]
}
])

export default router