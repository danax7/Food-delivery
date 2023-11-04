import axios from "axios";
import { useEffect, useState } from "react";

const useFetchData = (initialUrl: string) => {
  const [data, setData] = useState<any[]>([]);
  const fetchData = async (url: string) => {
    try {
      const response = await axios.get(url);
      setData(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData(initialUrl);
  }, [initialUrl]);

  return data;
};

export default useFetchData;
