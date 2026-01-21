import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { City, cities, getDefaultCity, getCityById } from "@/config/cities";

interface CityContextType {
  selectedCity: City;
  setSelectedCity: (city: City) => void;
  cities: City[];
}

const CityContext = createContext<CityContextType | undefined>(undefined);

const CITY_STORAGE_KEY = "bloomgift-selected-city";

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCityState] = useState<City>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(CITY_STORAGE_KEY);
      if (stored) {
        const city = getCityById(stored);
        if (city) return city;
      }
    }
    return getDefaultCity();
  });

  const setSelectedCity = (city: City) => {
    setSelectedCityState(city);
    localStorage.setItem(CITY_STORAGE_KEY, city.id);
  };

  useEffect(() => {
    const stored = localStorage.getItem(CITY_STORAGE_KEY);
    if (stored) {
      const city = getCityById(stored);
      if (city) setSelectedCityState(city);
    }
  }, []);

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity, cities }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used within a CityProvider");
  }
  return context;
};
