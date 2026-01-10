import { useMemo } from "react";
import { useSearchParams } from "react-router";


export function useTab() {

    const [searchparams, setSearchParams] = useSearchParams();
    const paramTab = searchparams.get('tab') || 'all';


    const activeTab = useMemo(() => {

        const ValidTabs = ['all', 'favorites', 'heroes', 'villains',];
        return (ValidTabs.includes(paramTab)) ? paramTab : 'all';
    }, [paramTab]);



    const setActiveTab = (tab: string) => {

        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set('tab', tab.toString());

            return newParams;
        });
    }





    return { activeTab, setActiveTab }

}