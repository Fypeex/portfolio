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
import Legal from "./Routes/Legal/Legal.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <CurtainProvider>
            <Home/>
            <Footer/>
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
                <title>Projects</title>
            </Helmet>
            <Header/>
            <Projects/>
            <Footer/>
        </CurtainProvider>
    }, {
        path: "/contact",
        element: <CurtainProvider>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="description" content="Contact me"/>
                <meta name="keywords" content="contact, software engineer, web developer, full stack developer"/>
                <meta name="author" content="Felix Jungbluth"/>
                <title>Contact</title>
            </Helmet>
            <Header/>
            <Contact/>
            <Footer/>
        </CurtainProvider>
    }, {
        path: "/about",
        element: <CurtainProvider>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="description" content="About me"/>
                <meta name="keywords" content="about, software engineer, web developer, full stack developer"/>
                <meta name="author" content="Felix Jungbluth"/>
                <title>About Me</title>
            </Helmet>
            <Header/>
            <AboutMe/>
            <Footer/>
        </CurtainProvider>
    }, {
        path: "/legal",
        element: <CurtainProvider>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="description" content="Legal information"/>
                <meta name="keywords" content="legal, software engineer, web developer, full stack developer"/>
                <meta name="author" content="Felix Jungbluth"/>
                <title>Legal Information</title>
            </Helmet>
            <Header/>
            <Legal/>
            <Footer/>
        </CurtainProvider>
    }, {
        path: "*",
        element: <CurtainProvider>
            <Helmet>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="description" content="404 Not Found"/>
                <meta name="keywords" content="404, not found, software engineer, web developer, full stack developer"/>
                <meta name="author" content="Felix Jungbluth"/>
                <title>404 Not Found</title>
            </Helmet>
            <Header/>
            <NotFound/>
            <Footer/>
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
                <link rel="icon" href="/portfolio/favicon.ico"/>
                <meta name="google-site-verification" content="dCrQEx76es-2Z8ar_enhh82l8ZgUVXfR7vnBzD3dC-0"/>
                <title>Portfolio</title>
            </Helmet>
            <RouterProvider router={router}/>

        </>
    )
}

export default App
