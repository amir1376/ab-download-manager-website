import {useAsync} from "react-use";
import {VersionData, getLatestVersionData} from "~/data/LatestAppVersionData.ts";
import React, {PropsWithChildren, useContext, useEffect, useState} from "react";
import {AsyncState} from "react-use/lib/useAsyncFn";

interface DownloadData {
    remoteData: AsyncState<VersionData>
    refresh: () => void
}

// @ts-ignore
const DownloadDataContext = React.createContext<DownloadData>(undefined)

export function ProvideDownloadData(
    props: PropsWithChildren & {
        requestData:(refreshCount:number)=>Promise<VersionData>
    }
) {
    const [refreshCount, setRefreshCount] = useState(0)
    const remoteData = useAsync(async () => {
        return props.requestData(refreshCount)
    }, [refreshCount])

    return <DownloadDataContext.Provider value={{
        remoteData: remoteData,
        refresh: () => setRefreshCount(v => v + 1)
    }}>
        {props.children}
    </DownloadDataContext.Provider>
}

export function useDownloadData() {
    const data = useContext(DownloadDataContext)
    return data
}
