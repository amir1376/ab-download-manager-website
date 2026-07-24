import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from "react";

export interface PageInfo {
    title?: string;
    description?: string;
    breadcrumbs?: { name: string; item?: string }[];
}

interface Entry {
    id: symbol;
    pageInfo: PageInfo;
}

type Action =
    | {
    type: "register";
    entry: Entry;
}
    | {
    type: "update";
    id: symbol;
    pageInfo: PageInfo;
}
    | {
    type: "unregister";
    id: symbol;
};

function reducer(state: Entry[], action: Action): Entry[] {
    switch (action.type) {
        case "register":
            return [...state, action.entry];

        case "update":
            return state.map(entry =>
                entry.id === action.id
                    ? {...entry, pageInfo: action.pageInfo}
                    : entry
            );

        case "unregister":
            return state.filter(entry => entry.id !== action.id);

        default:
            return state;
    }
}

interface PageInfoHost {
    pageInfo: PageInfo;
    dispatch: React.Dispatch<Action>;
}

const PageInfoHostContext = createContext<PageInfoHost | null>(null);

export function WithPageInfoHost(props: PropsWithChildren) {
    const [entries, dispatch] = useReducer(reducer, []);

    const pageInfo = useMemo<PageInfo>(() => {
        return entries.reduce<PageInfo>(
            (result, entry) => ({
                title: entry.pageInfo.title ?? result.title,
                description: entry.pageInfo.description ?? result.description,
                breadcrumbs: entry.pageInfo.breadcrumbs ?? result.breadcrumbs,
            }),
            {}
        );
    }, [entries]);

    const value = useMemo(
        () => ({
            pageInfo,
            dispatch,
        }),
        [pageInfo]
    );

    return (
        <PageInfoHostContext.Provider value={value}>
            {props.children}
        </PageInfoHostContext.Provider>
    );
}

export function WithPageInfo(
    props: PageInfo & PropsWithChildren
) {
    const host = useContext(PageInfoHostContext);

    if (!host) {
        throw new Error(
            "WithPageInfo must be used inside WithPageInfoHost"
        );
    }

    const id = useMemo(() => Symbol(), []);

    useEffect(() => {
        host.dispatch({
            type: "register",
            entry: {
                id,
                pageInfo: {
                    title: props.title,
                    description: props.description,
                    breadcrumbs: props.breadcrumbs,
                },
            },
        });

        return () => {
            host.dispatch({
                type: "unregister",
                id,
            });
        };
    }, [host.dispatch, id]);

    useEffect(() => {
        host.dispatch({
            type: "update",
            id,
            pageInfo: {
                title: props.title,
                description: props.description,
                breadcrumbs: props.breadcrumbs,
            },
        });
    }, [host.dispatch, id, props.title, props.description, props.breadcrumbs]);

    return <>{props.children}</>;
}

export function usePageInfo(): PageInfo {
    const host = useContext(PageInfoHostContext);

    if (!host) {
        throw new Error(
            "usePageInfo must be used inside WithPageInfoHost"
        );
    }

    return host.pageInfo;
}
