import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { usePagination } from "@/hooks/usePagination";

interface Props {
    totalPages: number,
}

export default function CustomPagination({ totalPages }: Props) {

    const { page, next: handleNext, prev: handlePrevious, setPage } = usePagination();


    return (
        <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" size="sm" disabled={page === 1} onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4" />
                Previous
            </Button>

            {
                Array.from({ length: totalPages }).map((_, index) => (
                    <Button
                        key={index}
                        variant={page === index + 1 ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPage(index + 1)}
                    >
                        {index + 1}
                    </Button>

                ))
            }


            <Button variant="outline" size="sm" disabled={page === totalPages} onClick={handleNext}>
                Next
                <ChevronRight className="h-4 w-4" />
            </Button>
        </div>
    )
}
