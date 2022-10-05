import useSWR from "swr";
import axios from "axios";

export function useFetchRaids<Data = any, Error = any>(url: string) {
    const { data, error } = useSWR<Data, Error>(url, async url => {
        const raidsData = await axios(url);
        const raidsResponse = await raidsData.data
        const raidsSWR = raidsResponse.response.raids
        return raidsSWR
    },
        { refreshInterval: 180000, revalidateIfStale: true, refreshWhenOffline: true }
    )

    return { data, error }

}

export function useFetchEggs<Data = any, Error = any>(url: string) {
    const { data, error } = useSWR<Data, Error>(url, async url => {
        const eggsData = await axios(url);
        const eggsResponse = await eggsData.data
        const eggsSWR = eggsResponse.response.eggs
        return eggsSWR
    },
        { refreshInterval: 180000, revalidateIfStale: true, refreshWhenOffline: true }
    )

    return { data, error }

}