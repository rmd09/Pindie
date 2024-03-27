import { useEffect, useState } from "react"
import { getNormalizedGameDataByCategory } from "./api-utils";

export const useGetDataByCategory = (endpoint, category) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const tempData = await getNormalizedGameDataByCategory(endpoint, category);
            setData(tempData);
        }

        fetchData();
    }, []);
    
    return data;
}