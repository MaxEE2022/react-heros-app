import { useMemo } from "react";
import { useSearchParams } from "react-router";


const pagesCache: Record<string, string> = {};

export function useTab() {

    const [searchparams, setSearchParams] = useSearchParams();
    const paramTab = searchparams.get('tab') || 'all';
    const paramPage = searchparams.get('page') || '1';


    const activeTab = useMemo(() => {

        const ValidTabs = ['all', 'favorites', 'hero', 'villain',];
        return (ValidTabs.includes(paramTab)) ? paramTab : 'all';
    }, [paramTab]);



    const setActiveTab = (tab: string) => {

        pagesCache[`${window.location.pathname}-${activeTab}`] = paramPage;

        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set('tab', tab.toString());
            const lastSavedPageTab = pagesCache[`${window.location.pathname}-${tab}`] || '1';
            newParams.set('page', lastSavedPageTab);

            return newParams;
        });
    }





    return { activeTab, setActiveTab }

}