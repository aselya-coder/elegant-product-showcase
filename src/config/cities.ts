export interface City {
  id: string;
  name: string;
  available: boolean;
}

export const cities: City[] = [
  { id: "jakarta", name: "Jakarta", available: true },
  { id: "bandung", name: "Bandung", available: true },
  { id: "surabaya", name: "Surabaya", available: true },
  { id: "yogyakarta", name: "Yogyakarta", available: true },
  { id: "semarang", name: "Semarang", available: true },
  { id: "medan", name: "Medan", available: true },
  { id: "makassar", name: "Makassar", available: true },
  { id: "bali", name: "Bali", available: true },
];

export const getDefaultCity = (): City => {
  return cities[0]; // Jakarta as default
};

export const getCityById = (id: string): City | undefined => {
  return cities.find(city => city.id === id);
};
