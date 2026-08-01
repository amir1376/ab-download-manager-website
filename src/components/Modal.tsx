import React, {PropsWithChildren, ReactNode} from "react";
import classNames from "classnames";
import {Icon} from "@iconify/react";

export function ModalHeader(
    props: {
        title: ReactNode,
        actions: ReactNode,
    }
) {
    return <div
        className="relative flex flex-row items-center justify-center select-none border-b border-base-content/10">
        <div className="py-3 sm:py-4 ps-2 sm:ps-4 flex-grow">
            {props.title}
        </div>
        <div className="flex-shrink-0 pe-2 sm:pe-4">
            {props.actions}
        </div>
    </div>
}

export function ModalHeaderTitleAndClose(
    props: {
        title: string,
        onClose: () => void
    }
) {
    return <ModalHeader
        title={
            <div className="font-bold text-base sm:text-lg text-center">{props.title}</div>
        }
        actions={
            <ModalCloseButton onClose={props.onClose}/>
        }
    />
}

export function ModalCloseButton(
    props: {
        onClose: () => void,
    }
) {
    return <ModalActionIconButton icon="mdi:close" onClick={props.onClose}/>
}

export function ModalActionIconButton(
    props: {
        onClick: () => void,
        icon: string,
    }
) {
    return <div
        className="btn btn-circle btn-ghost btn-sm sm:btn-md"
        onClick={props.onClick}
    >
        <Icon height={20} width={20} className="sm:h-6 sm:w-6" icon={props.icon}/>
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
            "modal-box",
            "rounded-3xl sm:w-auto max-w-full container",
            "border border-base-content/10",
            "p-0 max-h-dvh flex flex-col",//we want to use padding for each section
        )}>
            {props.children}
        </div>
        <div
            onClick={props.onClickOutside}
            className="modal-backdrop"
        />
    </div>
}
