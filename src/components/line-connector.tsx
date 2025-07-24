import { delayedConfig } from "@/lib/motion-transition";
import { cn } from "@/lib/utils";
import type { Variants } from "motion/react";
import * as m from "motion/react-m";
import { useCallback, useEffect, useRef, useState } from "react";

const visibilityVariants: Variants = {
    hidden: { opacity: 0 },
    visible: (index: number) => ({
        opacity: 1,
        transition: {
            ...delayedConfig(index, 0.2, 0.8),
            duration: 1,
        },
    }),
};

type AnchorPoint = "left" | "right";

interface LineConnectorProps {
    order: number;
    startAnchor?: AnchorPoint;
    endAnchor?: AnchorPoint;
    className?: string;
    cornerRadius?: number;
    minBranchLength?: number;
}

// Calculates the coordinates of an anchor point on an element's bounding box, relative to the SVG container
const getAnchorPoint = (
    elementRect: DOMRect,
    svgRect: DOMRect,
    anchor: AnchorPoint,
): { x: number; y: number } => {
    const y = elementRect.top - svgRect.top + elementRect.height / 2;
    switch (anchor) {
        case "left":
            return { x: elementRect.left - svgRect.left, y };
        case "right":
            return { x: elementRect.right - svgRect.left, y };
    }
};

// Generates the SVG path data with rounded corners and controllable branch length
const getCurvedPath = (
    startPos: { x: number; y: number },
    endPos: { x: number; y: number },
    startAnchor: AnchorPoint,
    endAnchor: AnchorPoint,
    cornerRadius: number,
    minBranchLength: number,
): string => {
    let midX: number;

    // Case 1: Turn-around connection (left-to-left or right-to-right)
    if (startAnchor === endAnchor) {
        const branchDirection = startAnchor === "left" ? -1 : 1;
        // Calculate the branch position ensuring it respects the minimum length
        const startBranchX = startPos.x + minBranchLength * branchDirection;
        const endBranchX = endPos.x + minBranchLength * branchDirection;

        midX =
            startAnchor === "left"
                ? Math.min(startBranchX, endBranchX)
                : Math.max(startBranchX, endBranchX);
    }

    // Case 2: Straight-across connection (left-to-right or right-to-left)
    else {
        midX = startPos.x + (endPos.x - startPos.x) / 2;
    }

    const h = Math.abs(startPos.y - endPos.y);
    const w = Math.abs(startPos.x - midX);
    const radius = Math.min(cornerRadius, h / 2, w);

    const dirY = endPos.y > startPos.y ? 1 : -1;
    const dirX1 = midX > startPos.x ? 1 : -1;
    const dirX2 = endPos.x > midX ? 1 : -1;

    // If radius is 0 or too small, draw sharp corners
    if (radius < 1) {
        return `M ${startPos.x} ${startPos.y} H ${midX} V ${endPos.y} H ${endPos.x}`;
    }

    return `
        M ${startPos.x} ${startPos.y}
        L ${midX - radius * dirX1} ${startPos.y}
        A ${radius} ${radius} 0 0 ${dirX1 * dirY > 0 ? 1 : 0} ${midX} ${startPos.y + radius * dirY}
        L ${midX} ${endPos.y - radius * dirY}
        A ${radius} ${radius} 0 0 ${dirX2 * dirY > 0 ? 0 : 1} ${midX + radius * dirX2} ${endPos.y}
        L ${endPos.x} ${endPos.y}
    `;
};

export function LineConnector({
    order,
    startAnchor = "right",
    endAnchor = "left",
    className = "",
    cornerRadius = 8,
    minBranchLength = 30,
}: LineConnectorProps) {
    const [pathData, setPathData] = useState("");
    const svgRef = useRef<SVGSVGElement>(null);
    const prevOrder = order - 1;

    const updateLine = useCallback(() => {
        requestAnimationFrame(() => {
            const svg = svgRef.current;
            if (!svg) return;

            const startElem = document.getElementById(`node#${prevOrder}`);
            const endElem = document.getElementById(`node#${order}`);

            if (startElem && endElem) {
                const svgRect = svg.getBoundingClientRect();
                const startRect = startElem.getBoundingClientRect();
                const endRect = endElem.getBoundingClientRect();

                const startPos = getAnchorPoint(
                    startRect,
                    svgRect,
                    startAnchor,
                );
                const endPos = getAnchorPoint(endRect, svgRect, endAnchor);

                setPathData(
                    getCurvedPath(
                        startPos,
                        endPos,
                        startAnchor,
                        endAnchor,
                        cornerRadius,
                        minBranchLength,
                    ),
                );
            }
        });
    }, [order, startAnchor, endAnchor, cornerRadius, minBranchLength]);

    useEffect(() => {
        updateLine();
        const startElem = document.getElementById(`node#${prevOrder}`);
        const endElem = document.getElementById(`node#${order}`);
        if (!startElem || !endElem) return;

        const observerCallback = () => updateLine();
        const resizeObserver = new ResizeObserver(observerCallback);
        resizeObserver.observe(startElem);
        resizeObserver.observe(endElem);
        if (startElem.parentElement) {
            resizeObserver.observe(startElem.parentElement);
        }

        window.addEventListener("resize", updateLine);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updateLine);
        };
    }, [updateLine]);

    return (
        <m.svg
            ref={svgRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10 overflow-visible"
            variants={visibilityVariants}
            custom={prevOrder}
        >
            <path
                d={pathData}
                className={cn(
                    "fill-none [stroke-linecap:round] [stroke-linejoin:round]",
                    className,
                )}
            />
        </m.svg>
    );
}
