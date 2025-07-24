import MurmurHash3 from "imurmurhash";
import { cn, countYears, date } from "@/lib/utils";
import type { TimelineEvent } from "@/types";
import {
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from "react";
import React from "react";
import { LineConnector } from "@/components/line-connector";
import * as m from "motion/react-m";
import { delayedConfig } from "@/lib/motion-transition";
import type { Variants } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";

type NodeProps = {
    id: number;
    name: string;
    icon: string;
    startYear: number;
    elapsed: number;
    elapsedString: string;
};

const yearString = (year: number) => `${year} year${year > 1 ? "s" : ""}`;

const visibilityVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (index: number) => ({
        opacity: 1,
        transition: {
            ...delayedConfig(index, 0.2, 0.7),
            duration: 1,
        },
    }),
};

function Node({ id, name, icon, elapsed, elapsedString }: NodeProps) {
    return (
        <>
            <m.div
                id={`node#${id}`}
                className={cn(
                    "p-1 gap-1 rounded-xs xs:p-2 xs:rounded-sm xs:gap-2 sm:p-2.5 sm:rounded-md sm:gap-2.5 md:p-3 md:gap-3 bg-white flex justify-center items-center shrink-0 select-none",
                    elapsed >= 5 && "border-1 xs:border-2 border-accent",
                    elapsed < 5 &&
                        elapsed >= 2 &&
                        "border-1 xs:border-2 border-accent/70",
                    elapsed < 2 && "border-1 xs:border-2 border-accent/30",
                )}
                variants={visibilityVariants}
                custom={id}
            >
                {icon !== "" && (
                    <img
                        className="size-3 xs:size-4 sm:size-6 md:size-8"
                        src={icon}
                        alt={`${name} icon`}
                    />
                )}

                <div className="flex flex-col">
                    <span className="font-semibold text-2xs xs:text-xs sm:text-sm md:text-base">
                        {name}
                    </span>
                    <span
                        className={cn(
                            "xs:-mt-1 text-muted-foreground text-2xs xs:text-xs sm:text-sm md:text-base",
                            icon === "" && "text-center",
                        )}
                    >
                        {elapsedString}
                    </span>
                </div>
            </m.div>
        </>
    );
}

interface LinkedListProps {
    events: TimelineEvent[];
    className?: string;
}
export function LinkedList({ events, className }: LinkedListProps) {
    const transformed = useMemo(() => {
        const result = events
            .sort((a, b) => a.startDate - b.startDate)
            .map((e) => {
                const elapsed = countYears(e.startDate, e.endDate);

                return {
                    name: e.name,
                    icon: `./brand/${e.icon}${e.icon === "drs" ? ".png" : ".svg"}`,
                    startYear: new Date(e.startDate).getFullYear(),
                    elapsed,
                    elapsedString: yearString(Math.round(elapsed * 10) / 10),
                };
            });

        const elapsed = countYears(date(2017));
        result.push({
            name: "and still learning",
            icon: "",
            startYear: 0,
            elapsed: elapsed,
            elapsedString: yearString(Math.round(elapsed * 10) / 10),
        });
        return result;
    }, [events]);

    const items = useMemo(
        () => transformed.map((e, i) => <Node key={i} id={i} {...e} />),
        [transformed],
    );

    const mediaQuery = useMediaQuery("(min-width: 640px)");

    return (
        <>
            <ZigzagContainer
                className={cn(
                    "flex items-center justify-center flex-wrap w-full",
                    "[&_path]:!stroke-accent/50",
                    className,
                )}
                xgap={4 * (mediaQuery ? 8 : 4)}
                ygap={4 * (mediaQuery ? 4 : 2)}
            >
                {items}
            </ZigzagContainer>
        </>
    );
}

interface ZigzagContainerProps {
    children: ReactNode;
    className?: string;
    xgap?: number;
    ygap?: number;
}

function ZigzagContainer({
    children,
    className = "",
    xgap = 12,
    ygap = xgap,
}: ZigzagContainerProps) {
    const [rows, setRows] = useState<ReactNode[][]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsContainerRef = useRef<HTMLDivElement>(null);

    const childrenArray = React.Children.toArray(children);

    const childrenKeys = new MurmurHash3(
        React.Children.map(children, (child) =>
            React.isValidElement(child) ? child.key : null,
        )?.join(",") || "",
    ).result();

    const measurementChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            // Clone the element, but overwrite the 'id' prop to be undefined.
            // This removes the id from the cloned element used only for measurement.
            return React.cloneElement(child as React.ReactElement<any>, {
                id: undefined,
                key: child.key,
            });
        }
        return child;
    });

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const calculateRows = () => {
            const itemsContainer = itemsContainerRef.current;
            if (!itemsContainer) return;

            const containerWidth = container.getBoundingClientRect().width;
            const itemNodes = Array.from(
                itemsContainer.children,
            ) as HTMLElement[];

            const newRows: ReactNode[][] = [];
            if (itemNodes.length === 0) {
                setRows([]);
                return;
            }

            let currentRow: ReactNode[] = [];
            let currentRowWidth = 0;

            itemNodes.forEach((node, index) => {
                const itemWidth = node.offsetWidth;
                // Use the original child from childrenArray to preserve all original props (including id) for the final render.
                const child = childrenArray[index];

                const widthWithGap =
                    currentRow.length > 0
                        ? currentRowWidth + xgap + itemWidth
                        : itemWidth;

                if (currentRow.length > 0 && widthWithGap > containerWidth) {
                    newRows.push(currentRow);
                    currentRow = [child];
                    currentRowWidth = itemWidth;
                } else {
                    currentRow.push(child);
                    currentRowWidth = widthWithGap;
                }
            });

            if (currentRow.length > 0) {
                newRows.push(currentRow);
            }

            setRows(newRows);
        };

        const resizeObserver = new ResizeObserver(calculateRows);
        resizeObserver.observe(container);

        calculateRows();

        return () => {
            resizeObserver.disconnect();
        };
    }, [childrenKeys, xgap]);

    return (
        <div ref={containerRef} className={className}>
            {/* Hidden Measurement Container */}
            <div
                ref={itemsContainerRef}
                className="flex flex-row absolute opacity-0 -z-10 pointer-events-none"
                style={{ columnGap: `${xgap}px`, rowGap: `${ygap}px` }}
                aria-hidden={true}
            >
                {measurementChildren}
            </div>

            {/* Visible Layout Container */}
            <div
                className="relative flex flex-col items-center"
                style={{ columnGap: `${xgap}px`, rowGap: `${ygap}px` }}
            >
                {rows.map((rowItems, rowIndex) => (
                    <div
                        key={rowIndex}
                        className={`flex justify-center flex-wrap ${
                            rowIndex % 2 === 0 ? "flex-row" : "flex-row-reverse"
                        }`}
                        style={{ columnGap: `${xgap}px`, rowGap: `${ygap}px` }}
                    >
                        {rowItems}
                    </div>
                ))}

                <GenerateLines rows={rows} minBranchLength={xgap} />
            </div>
        </div>
    );
}

function GenerateLines({
    rows,
    minBranchLength,
}: {
    rows: ReactNode[][];
    minBranchLength: number;
}) {
    const [compose, keys] = useMemo(() => {
        const arrays = rows.reduce<number[]>(
            (prev, cur) => [...prev, cur.length],
            [],
        );
        const keys = new MurmurHash3(JSON.stringify(arrays)).result();
        return [arrays, keys];
    }, [rows]);

    const lines = useMemo(() => {
        let acc = 0;
        const newArray: ReactNode[] = [];

        compose.forEach((column, r) => {
            for (let c = 0; c < column; c++, acc++) {
                if (acc <= 0) continue;

                newArray.push(
                    <LineConnector
                        key={acc}
                        order={acc}
                        startAnchor={startAnchor(r, c)}
                        endAnchor={endAnchor(r)}
                        className="stroke-1 xs:stroke-2"
                        cornerRadius={minBranchLength / 4}
                        minBranchLength={minBranchLength}
                    />,
                );
            }
        });

        return newArray;
    }, [keys]);

    return <>{lines}</>;
}

const startAnchor = (row: number, column: number) => {
    return column === 0
        ? row % 2 === 0
            ? "left"
            : "right"
        : row % 2 === 0
          ? "right"
          : "left";
};

const endAnchor = (row: number) => {
    return row % 2 === 0 ? "left" : "right";
};
