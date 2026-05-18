import { useState, type JSX } from "react";
import { Badge } from "../component/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "../component/ui/toggle-group";


const tabs = [
    { label: "All", count: "12", value: "all"},
    { label: "Today", count: "5", value: "today"},
    { label: "Complete", count: "3", value: "complete"},
];

export const TaskFilterTabSection = (): JSX.Element => {
    const [selectedTab, setSelectedTab] = useState("all");

    return (
        <section className="w-full">
            <ToggleGroup
                type="single"
                value={selectedTab}
                onValueChange={(value) => {
                    if(value) setSelectedTab(value);
                }}
                className="flex w-full flex-wrap items-center justify-start gap-1.5"
                aria-label="Filter tasks"
            >
                {tabs.map((tab) => {
                    const isActive = selectedTab === tab.value;

                    return (
                        <ToggleGroupItem
                            key={tab.value}
                            value={tab.value}
                            aria-label={tab.label}
                            className={`flex h-8 items-center rounded-full px-3 transition-colors ${isActive ? "bg-white shadow=sm text-gray-900" : "bg-transparent text-gray-500 hover:text-gray-700"}`}
                        >
                            <span className="flex items-center gap-1.75">
                                <span className="mt-[-0.50px] font-['Inter',Helvetica] text-[13px] font-normal leading-[normal] tracking-normal">
                                    {tab.label}
                                </span>
                                <Badge 
                                    variant="secondary"
                                    className={`rounded-full px-1.5 py-0.5 text-xs ${isActive ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}
                                >
                                    {tab.count}
                                </Badge>
                            </span>
                        </ToggleGroupItem>
                    )
                })}
            </ToggleGroup>
        </section>
    );
};