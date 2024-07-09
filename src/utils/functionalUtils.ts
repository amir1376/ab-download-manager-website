export function run<R>(block:()=>R) {
    return block()
}
export function runWith<T,R>(arg:T, block:(arg:T)=>R) {
    return block(arg)
}
export function takeIf<T>(item:T,condition:(item:T)=>boolean){
    if (condition(item)){
        return item
    }
    return null
}