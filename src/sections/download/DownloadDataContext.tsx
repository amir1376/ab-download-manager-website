import {useAsync} from "react-use";
import {delay} from "~/utils/AsyncUtil.ts";
import {ApiResult, getLatestVersionData} from "~/data/LatestAppVersionData.tsx";
import React, {PropsWithChildren, useContext, useEffect, useState} from "react";
import {AsyncState} from "react-use/lib/useAsyncFn";

interface DownloadData{
    remoteData:AsyncState<ApiResult>
    refresh:()=>void
}
// @ts-ignore
const DownloadDataContext = React.createContext<DownloadData>(undefined)

export function ProvideDownloadData(
    props:PropsWithChildren
){
    const [refreshCount,setRefreshCount]=useState(0)
    const remoteData = useAsync(async () => {
        return await getLatestVersionData()
    },[refreshCount])

    return <DownloadDataContext.Provider value={{
        remoteData:remoteData,
        refresh:()=>setRefreshCount(v=>v+1)
    }}>
        {props.children}
    </DownloadDataContext.Provider>
}

export function useDownloadData(){
    const data = useContext(DownloadDataContext)
    return data
}
