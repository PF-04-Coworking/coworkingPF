"use client";
import { Button } from "@/components/common/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/common/popover";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { Command } from "@/components/common/Commandx";
import { Paragraph } from "@/components/common/Paragraph";

interface ISortProps {
  onSort: (option: string) => void;
  sortOptions: Record<string, string>;
  defaultSortOption?: string;
}

const Sort = ({ onSort, sortOptions, defaultSortOption }: ISortProps) => {
  const [selectedSortOption, setSelectedSortOption] = useState(
    defaultSortOption || ""
  );

  const handleSort = (option: string) => {
    setSelectedSortOption(option);
    onSort(option);
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="flex-shrink-0">
        <Button variant="outline" className="flex items-center gap-2">
          {selectedSortOption
            ? `${sortOptions[selectedSortOption]}`
            : "Ordenar por"}
          <ChevronDownIcon size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="border-2 border-primary bg-background p-2">
        <div className="flex flex-col gap-3">
          <Command className="bg-transparent">
            <div className="flex flex-col gap-3">
              {Object.keys(sortOptions).map((option, index) => (
                <Paragraph
                  key={index}
                  variant="primary"
                  value="next.js"
                  onClick={() => handleSort(option)}
                  className="p-3 hover:bg-secondaryDark cursor-pointer rounded-md bg-transparent transition"
                >
                  {sortOptions[option]}
                </Paragraph>
              ))}
            </div>
          </Command>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { Sort };
