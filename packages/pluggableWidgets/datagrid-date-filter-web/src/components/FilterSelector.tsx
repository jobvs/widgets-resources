import { createElement, ReactElement, RefObject, useCallback, useEffect, useRef, useState } from "react";
import { DefaultFilterEnum } from "../../typings/DatagridDateFilterProps";
import classNames from "classnames";

const options: Array<{ value: DefaultFilterEnum; label: string }> = [
    { value: "greater", label: "Greater than" },
    { value: "greaterEqual", label: "Greater than or equal" },
    { value: "equal", label: "Equal" },
    { value: "notEqual", label: "Not equal" },
    { value: "smaller", label: "Smaller than" },
    { value: "smallerEqual", label: "Smaller than or equal" }
];

interface FilterSelectorProps {
    ariaLabel?: string;
    name?: string;
    defaultFilter: DefaultFilterEnum;
    onChange: (value: DefaultFilterEnum) => void;
}

export function FilterSelector(props: FilterSelectorProps): ReactElement {
    const [value, setValue] = useState(props.defaultFilter);
    const [show, setShow] = useState(false);
    const listRef = useRef<HTMLUListElement>(null);
    useOnClickOutside(listRef, () => setShow(false));
    const onClick = useCallback(
        (value: DefaultFilterEnum) => {
            setValue(value);
            props.onChange(value);
            setShow(false);
        },
        [props.onChange]
    );
    return (
        <div className="filter-selector">
            <div className="filter-selector-content">
                <button
                    aria-controls={`${props.name}-filter-selectors`}
                    aria-expanded={show}
                    aria-haspopup
                    aria-label={props.ariaLabel}
                    className={classNames("btn btn-default filter-selector-button button-icon", value)}
                    onClick={() => setShow(show => !show)}
                >
                    &nbsp;
                </button>
                {show && (
                    <ul
                        id={`${props.name}-filter-selectors`}
                        className="filter-selectors"
                        ref={listRef}
                        role="menu"
                        data-focusindex={0}
                    >
                        {options.map((option, index) => (
                            <li
                                className={classNames({ "filter-selected": value === option.value })}
                                key={index}
                                onClick={() => onClick(option.value)}
                                onKeyDown={e => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        onClick(option.value);
                                    }
                                }}
                                role="menuitem"
                                tabIndex={0}
                            >
                                <div className={classNames("filter-icon", option.value)} aria-hidden />
                                <div className="filter-label">{option.label}</div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export function useOnClickOutside(ref: RefObject<HTMLUListElement>, handler: () => void): void {
    useEffect(() => {
        const listener = (event: MouseEvent & { target: Node | null }): void => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
