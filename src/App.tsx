import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router";
import Header from "./Components/Header/Header.tsx";
import Footer from "./Components/Footer/Footer.tsx";
import Home from "./Routes/Home/Home.tsx";
import Projects from "./Routes/Projects/Projects.tsx";
import Contact from "./Routes/Contact/Contact.tsx";
import {CurtainProvider} from "./Provider/CurtainContext.tsx";
import AboutMe from "./Routes/AboutMe/AboutMe.tsx";
import {Helmet} from "react-helmet"
import NotFound from "./Routes/NotFound/NotFound.tsx";



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
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="description" content="Projects of a software engineer"/>
                <meta name="keywords" content="projects, software engineer, web developer, full stack developer"/>
                <meta name="author" content="Felix Jungbluth"/>
                <link rel="icon" href="/favicon.ico"/>
                <title>Projects</title>
            </Helmet>
            <Header/>
            <Projects/>
        </CurtainProvider>
    }, {
        path: "/contact",
        element: <CurtainProvider>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="description" content="Contact me"/>
                <meta name="keywords" content="contact, software engineer, web developer, full stack developer"/>
                <meta name="author" content="Felix Jungbluth"/>
                <link rel="icon" href="/favicon.ico"/>
                <title>Contact</title>
            </Helmet>
            <Header/>
            <Contact/>
        </CurtainProvider>
    }, {
        path: "/about",
        element: <CurtainProvider>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="description" content="About me"/>
                <meta name="keywords" content="about, software engineer, web developer, full stack developer"/>
                <meta name="author" content="Felix Jungbluth"/>
                <link rel="icon" href="/favicon.ico"/>
                <title>About Me</title>
            </Helmet>
            <Header/>
            <AboutMe/>
        </CurtainProvider>
    }, {
        path: "*",
        element: <CurtainProvider>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="description" content="404 Not Found"/>
                <meta name="keywords" content="404, not found, software engineer, web developer, full stack developer"/>
                <meta name="author" content="Felix Jungbluth"/>
                <link rel="icon" href="/favicon.ico"/>
                <title>404 Not Found</title>
            </Helmet>
            <Header/>
            <NotFound/>
        </CurtainProvider>
    }
], {basename: "/portfolio"})

function App() {
    return (
        <>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="description" content="Portfolio of a software engineer"/>
                <meta name="keywords" content="portfolio, software engineer, web developer, full stack developer"/>
                <meta name="author" content="Felix Jungbluth"/>
                <link rel="icon" href="/favicon.ico"/>
                <title>Portfolio</title>
            </Helmet>
            <RouterProvider router={router}/>
            <Footer/>

        </>
    )
}

export default App
