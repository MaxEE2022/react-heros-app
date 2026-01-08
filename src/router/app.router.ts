import { AdminPage } from "@/admin/pages/AdminPage";
import HeroPage from "@/heros/pages/hero/HeroPage";
import HomePage from "@/heros/pages/home/HomePage";
import { searchPage } from "@/heros/pages/search/searchPage";
import { createBrowserRouter } from "react-router";


export const appRouter = createBrowserRouter([
    {
        path: '/',
        Component: HomePage
    },
    {
        path: '/admin',
        Component: AdminPage
    },
    {
        path: '/hero/:id',
        Component: HeroPage
    },
    {
        path: '/search',
        Component: searchPage
    },

]);