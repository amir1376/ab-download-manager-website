export function getIcoifyLink(
    icon:string
):string{
    const [provider,name]=icon.split(":")
    if (!provider && !name){
        throw new Error(`please give me a valid icon -> ${icon}`)
    }
    return _getIcoifyLink(provider,name)
}
function _getIcoifyLink(
    provider:string,
    name:string,
):string{
    return `https://api.iconify.design/${provider}/${name}.svg`
}