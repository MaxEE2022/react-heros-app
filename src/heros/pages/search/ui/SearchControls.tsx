import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, SortAsc, Grid, Plus } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { useSearchParams } from "react-router";

export default function SearchControls() {
    const [searchParams, setSearchParams] = useSearchParams();

    const queryParam = searchParams.get('query');
    const advancedFiltersParam = searchParams.get('advanced-filters') === 'true';
    const strengthParam = Number(searchParams.get('strength')) || 0;
    const teamParam = searchParams.get('team');
    const universeParam = searchParams.get('universe');
    const categoryParam = searchParams.get('category');
    const statusParam = searchParams.get('status');

    const searchQueryRef = useRef<HTMLInputElement>(null);
    const [isActiveAdvancedFilters, setIsActiveAdvancedFilters] = useState(advancedFiltersParam);
    const [strength, setStrength] = useState(strengthParam);
    const [team, setTeam] = useState(teamParam || undefined);
    const [universe, setUniverse] = useState(universeParam || undefined);
    const [category, setCategory] = useState(categoryParam || undefined);
    const [status, setStatus] = useState(statusParam || undefined);


    function handleOnEnterDown(evnet: KeyboardEvent<HTMLInputElement>) {
        if (evnet.key === 'Enter') {
            applyFilters();
        }
    }

    function handelOnSliderChange(value: number[]) {
        setStrength(value[0])
    }

    function applyFilters() {
        const filters = {
            query: searchQueryRef.current?.value,
            strength: isActiveAdvancedFilters ? strength.toString() : undefined,
            team: isActiveAdvancedFilters ? team : undefined,
            category: isActiveAdvancedFilters ? category : undefined,
            universe: isActiveAdvancedFilters ? universe : undefined,
            status: isActiveAdvancedFilters ? status : undefined,
            'advanced-filters': isActiveAdvancedFilters ? 'true' : undefined,
        }

        setSearchParams(
            (prevParams) => {
                const newparams = new URLSearchParams(prevParams);
                Object.entries(filters).forEach(([key, value]) => {
                    if (value && value !== '' && value !== 'false' && value !== 'all' && value !== '0') {
                        newparams.set(key, value);
                    }
                    else {
                        newparams.delete(key);
                    }
                })
                return newparams;
            }
        ); 1
    }

    return (
        <>
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input
                        ref={searchQueryRef}
                        placeholder="Search heroes, villains, powers, teams..."
                        className="pl-12 h-12 text-lg bg-white"
                        onKeyDown={handleOnEnterDown}
                        defaultValue={queryParam ?? ''}
                    />
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                    <Button
                        variant={isActiveAdvancedFilters ? 'default' : "outline"}
                        className="h-12 "
                        onClick={() => {
                            setIsActiveAdvancedFilters(!isActiveAdvancedFilters)
                        }}
                    >
                        <Filter className="h-4 w-4 mr-2" />
                        Filters
                    </Button>

                    <Button variant="outline" className="h-12 ">
                        <SortAsc className="h-4 w-4 mr-2" />
                        Sort by Name
                    </Button>

                    <Button variant="outline" className="h-12 ">
                        <Grid className="h-4 w-4" />
                    </Button>

                    <Button className="h-12">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Character
                    </Button>
                </div>
            </div>


            {/* Advanced Filters */}

            <Accordion type="single" collapsible value={isActiveAdvancedFilters ? "advanced-filters-1" : ''}>
                <AccordionItem value="advanced-filters-1">
                    {/* <AccordionTrigger>Is it accessible?</AccordionTrigger> */}
                    <AccordionContent>
                        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                                <Button variant="ghost">Clear All</Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium ">Universe</label>
                                    <Select
                                        value={universe?.toString() ?? undefined}
                                        onValueChange={value => setUniverse(value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Team" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="marvel">Marvel</SelectItem>
                                            <SelectItem value="dc">DC</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Category</label>
                                    <Select
                                        value={category?.toString() ?? undefined}
                                        onValueChange={value => setCategory(value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="hero">Hero</SelectItem>
                                            <SelectItem value="villain">Villain</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Team</label>
                                    <div className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                                        All Teams
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Status</label>

                                    <Select
                                        value={status?.toString() ?? undefined}
                                        onValueChange={value => setStatus(value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="deceased"> Deceased</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-sm font-medium">Minimum Strength: {strength}/10</label>
                                <Slider defaultValue={[strength]} max={10} step={1} onValueChange={handelOnSliderChange} />
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </>
    )
}
