import React, {HTMLAttributes, PropsWithChildren} from "react";
import classNames from "classnames";
import {Icon} from "@iconify/react";

export function ModalHeader(
    props: {
        title: string,
        onClose: () => void
    }
) {
    return <div className="relative flex flex-row items-center justify-center select-none py-3 sm:py-4 px-12 border-b border-base-content/10">
        <div className="font-bold text-base sm:text-lg text-center">{props.title}</div>
        <div
            className="absolute end-2 sm:end-4 btn btn-circle btn-ghost btn-sm sm:btn-md"
            onClick={props.onClose}
        >
            <Icon height={20} width={20} className="sm:h-6 sm:w-6" icon="mdi:close" />
        </div>
    </div>
}

export function ModalContent(
    props: PropsWithChildren
) {
    return <div className="px-4 sm:px-6 md:px-8 pb-6 md:pb-8 flex-1 overflow-y-auto">
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
            "border border-base-content/10",
            "p-0 max-h-dvh h-[80%] flex flex-col",//we want to use padding for each section
        )}>
            {props.children}
        </div>
        <div
            onClick={props.onClickOutside}
            className="modal-backdrop"
        />
    </div>
}
