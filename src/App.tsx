import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import Header from "./Components/Header/Header.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import Home from "./Routes/Home/Home.tsx";
import Projects from "./Routes/Projects/Projects.tsx";
import Contact from "./Routes/Contact/Contact.tsx";
import {CurtainProvider} from "./Provider/CurtainContext.tsx";
import AboutMe from "./Routes/AboutMe/AboutMe.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <CurtainProvider>
            <Home/>
        </CurtainProvider>
    },
    {
        path: "/projects",
        element: <CurtainProvider>
            <Header/>
            <Projects/>
        </CurtainProvider>
    }, {
        path: "/contact",
        element: <CurtainProvider>
            <Header/>
            <Contact/>
        </CurtainProvider>
    }, {
        path: "/about",
        element: <CurtainProvider>
            <Header/>
            <AboutMe/>
        </CurtainProvider>
    }
])

function App() {
    return (
        <>
            <RouterProvider router={router}/>
            <Footer/>

        </>
    )
}

export default App
