import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCountries = () => {
  const query = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/countries"
      );
      if (!response) {
        throw new Error("Failed to fetch countries");
      }
      return response;
    },
    refetchOnWindowFocus: false,
  });
  return query;
};
