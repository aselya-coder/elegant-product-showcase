import { MapPin, ChevronDown } from "lucide-react";
import { useCity } from "@/hooks/use-city";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const CitySelector = () => {
  const { selectedCity, setSelectedCity, cities } = useCity();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none">
        <MapPin className="h-4 w-4 text-primary" />
        <span className="font-medium">{selectedCity.name}</span>
        <ChevronDown className="h-3.5 w-3.5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-48 bg-background border border-border shadow-lg z-50"
      >
        {cities.map((city) => (
          <DropdownMenuItem
            key={city.id}
            onClick={() => setSelectedCity(city)}
            className={`cursor-pointer ${
              selectedCity.id === city.id 
                ? "bg-primary/10 text-primary font-medium" 
                : "hover:bg-muted"
            }`}
          >
            <MapPin className="h-4 w-4 mr-2" />
            {city.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CitySelector;
