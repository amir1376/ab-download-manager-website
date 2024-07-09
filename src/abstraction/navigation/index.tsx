import React, {MouseEventHandler, PropsWithChildren} from "react";
import {Link, LinkProps} from "react-router-dom";

type  MyLinkProps = {
    href: string,
    enabled?: boolean,
} & PropsWithChildren

export function MyLink(
    props: MyLinkProps & {
        className?: string,
    } & Omit<LinkProps, "to">
) {
    let onClick:MouseEventHandler|undefined = undefined
    if (props.enabled===false){
        onClick=(e)=>e.preventDefault()
    }
    return <Link onClick={onClick} {...props} to={props.href}>
        {props.children}
    </Link>
}