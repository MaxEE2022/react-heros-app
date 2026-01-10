import AdminLayout from "@/admin/layouts/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";
import HeroLayout from "@/heros/layouts/HeroLayout";
import HeroPage from "@/heros/pages/hero/HeroPage";
import HomePage from "@/heros/pages/home/HomePage";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";


// carga bajo demanda / lazy load
const SearchPage = lazy(() => import('@/heros/pages/search/SearchPage'));


export const appRouter = createBrowserRouter([
    {
        path: '/',
        Component: HeroLayout,
        children: [

            {
                index: true,
                Component: HomePage
            },
            {
                path: 'hero/:slugId',
                Component: HeroPage
            },
            {
                path: 'search',
                Component: SearchPage
            },
        ]
    },


    {
        path: '/admin',
        Component: AdminLayout,
        children: [

            {
                index: true,
                Component: AdminPage
            },

        ]
    },
    
]);