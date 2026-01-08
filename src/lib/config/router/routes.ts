import { HerosApp } from "@/HerosApp";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    { path: '/', Component: HerosApp }
]);