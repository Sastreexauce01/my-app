"use client";
import { IFoodReduced, IFood } from "@/types";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Home() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [foods, setFoods] = React.useState<IFoodReduced[]>([]);
  const [isloading, setIsloading] = React.useState<boolean>(true);
  const router = useRouter();

  const fetchFoods = async () => {
    try {
      const response = await fetch("api/foods/all");
      const data = await response.json();

      const foodsReduced: IFoodReduced[] = data.map((food: IFood) => ({
        value: food.name.toLocaleLowerCase().replace(/ /g, "-"),
        label: food.name,
      }));
      setFoods(foodsReduced);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    const initialisze = async () => {
      await fetchFoods();
      setIsloading(false);
    };

    initialisze();
  }, []);

  React.useEffect(() => {
    if (value.length > 0) {
      router.push(`/food/${value}`);
    }
  }, [value, router]);

  return (
    <>
      {!isloading ? (
        <div className="min-h-screen bg-blue-900 text-white flex flex-col items-center   ">
          <h1 className="text-3xl font-extrabold mb-4 ">Welcome to <span className="title_colored">NutriSpark</span>
          </h1>

          <p className="text-lg mb-8 text-center max-w-2xl">
            Discover the nutritional values of your favorite foods. Use the search below to get started.
          </p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[300px] justify-between"
              >
                {value
                  ? foods.find((food) => food.value === value)?.label
                  : "Select Food..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="bottom"  className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search framework..." />
                <CommandList>
                  <CommandEmpty>No food found.</CommandEmpty>
                  <CommandList>
                    {foods.map((food) => (
                      <CommandItem
                        key={food.value}
                        value={food.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === food.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {food.label}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen text-white">
          <p className="text-2xl">Loading...</p>
        </div>
      )}
    </>
  );
}
