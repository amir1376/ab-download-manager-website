type EmptyOrDot<T extends string> = T extends "" ? T : "."


export type FlattenKeys<T, Prefix extends string = ''> = T extends object
    ? {
        [K in keyof T & string]: FlattenKeys<T[K], `${Prefix}${EmptyOrDot<Prefix>}${K}`>
    }[keyof T & string]
    : Prefix;
