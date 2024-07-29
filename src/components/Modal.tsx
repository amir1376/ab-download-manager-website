import React, {HTMLAttributes, PropsWithChildren} from "react";
import classNames from "classnames";
import {Icon} from "@iconify/react";

export function ModalHeader(
    props: {
        title: string,
        onClose: () => void
    }
) {
    return <div className="flex flex-col select-none">
        <div className="flex flex-row items-center ps-4 pt-2 pe-2 pb-4">
            <div className="font-bold text-lg flex-1 text-center">{props.title}</div>
            <div
                className="btn btn-circle btn-ghost"
                onClick={props.onClose}
            >
                <Icon height={24} width={24} icon="mdi:close"/>
            </div>
        </div>
    </div>
}

export function ModalContent(
    props: PropsWithChildren
) {
    return <div className="px-8 pb-8">
        {props.children}
    </div>
}

export function Modal(
    props: PropsWithChildren & {
        onClickOutside?: () => void
    }
) {
    return <div className="modal modal-open" role="dialog">
        <div className={classNames(
            "modal-box bg-base-200 text-base-content",
            "rounded-3xl sm:w-auto max-w-full container",
            "p-0",//we want to use padding for each section
        )}>
            <div className="">
                {props.children}
            </div>
        </div>
        <div
            onClick={props.onClickOutside}
            className="modal-backdrop"
        />
    </div>
}
