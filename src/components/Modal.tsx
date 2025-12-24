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
        <div className="flex flex-row items-center ps-3 sm:ps-4 pt-2 pe-2 pb-3 sm:pb-4">
            <div className="font-bold text-base sm:text-lg flex-1 text-center">{props.title}</div>
            <div
                className="btn btn-circle btn-ghost btn-sm sm:btn-md"
                onClick={props.onClose}
            >
                <Icon height={20} width={20} className="sm:h-6 sm:w-6" icon="mdi:close"/>
            </div>
        </div>
    </div>
}

export function ModalContent(
    props: PropsWithChildren
) {
    return <div className="px-4 sm:px-6 md:px-8 pb-6 md:pb-8">
        {props.children}
    </div>
}

export function Modal(
    props: PropsWithChildren & {
        onClickOutside?: () => void
    }
) {
    return <div className="modal modal-bottom md:modal-top sm:pt-16 modal-open" role="dialog">
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
