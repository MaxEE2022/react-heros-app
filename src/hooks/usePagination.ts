import { useSearchParams } from "react-router";



export function usePagination(key: string = 'page') {

    const [searchParams, setSearchParams] = useSearchParams();

    const Rawpage = parseInt(searchParams.get(key) || '1', 10);
    const page = isNaN(Rawpage) || Rawpage < 1 ? 1 : Rawpage;

    const setPage = (newPage: number) => {
        if (newPage < 1) return;
        setSearchParams((prevParams) => {
            const newParams = new URLSearchParams(prevParams);
            newParams.set(key, newPage.toString());

            return newParams;
        });

    }


    return {
        page,
        next: () => setPage(page + 1),
        prev: () => setPage(page - 1),
        setPage
    }
}
