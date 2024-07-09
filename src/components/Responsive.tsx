import {useMediaQuery} from "react-responsive"

export const useTabletAndBelowMediaQuery = () => useMediaQuery({query: "(max-width: 1279px)"})
export const isDesktop = () => useMediaQuery({minWidth: 1024})
export const isTabletAndAbove = () => useMediaQuery({minWidth: 768})
export const isTablet = () => useMediaQuery({minWidth: 768, maxWidth: 1023})
export const isMobile = () => useMediaQuery({maxWidth: 767})
export const isNotMobile = () => useMediaQuery({minWidth: 768})

export const Desktop = ({children}) => {
    return isDesktop() ? children : null
}

export const TabletAndBelow = ({children}) => {
    const isTabletAndBelow = useTabletAndBelowMediaQuery()
    return isTabletAndBelow ? children : null
}
export const TabletAndAbove = ({children}) => {
    return isTabletAndAbove() ? children : null
}
export const Tablet = ({children}) => {
    return isTablet() ? children : null
}
export const Mobile = ({children}) => {
    return isMobile() ? children : null
}
