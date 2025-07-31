import { NavHashLink } from "react-router-hash-link";
import { personalData } from "@/data/personal-data";
import * as m from "motion/react-m";
import type { Variants } from "motion/react";
import { delayedConfig } from "@/lib/motion-transition";
import { useMediaQuery } from "@/hooks/use-media-query";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { Menu01Icon } from "@hugeicons-pro/core-stroke-rounded";
import { Separator } from "@/components/ui/separator";

const _vTopToNormal: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            ...delayedConfig(index, 0.085, 1.5),
            duration: 1,
        },
    }),
};

export function Navbar() {
    return (
        <NavigationMenu
            viewport={false}
            className="flex items-center gap-4 text-sm w-full max-w-full *:first:w-full"
        >
            <NavigationMenuList className="justify-start -ml-2 -mr-3">
                <NavigationMenuItem className="mr-auto">
                    <m.div variants={_vTopToNormal} custom={0}>
                        <NavigationMenuLink
                            asChild
                            className="!bg-transparent "
                        >
                            <NavHashLink
                                to="/#"
                                className="flex items-center gap-2"
                            >
                                <span className="font-bold text-base xs:text-lg text-xellanix-900">
                                    {personalData.name}
                                </span>
                            </NavHashLink>
                        </NavigationMenuLink>
                    </m.div>
                </NavigationMenuItem>

                <DynamicNavbar />
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const _portfolioSections = [
    {
        name: "Home",
        href: "/#home",
    },
    {
        name: "Skills",
        href: "/#skills",
    },
    {
        name: "Projects",
        href: "/#projects",
    },
    {
        name: "Achievements",
        href: "/#achievements",
    },
    {
        name: "Contact",
        href: "/#contact",
    },
] as const;

function DynamicNavbar() {
    const isSmallScreen = useMediaQuery("(max-width: 22rem)");

    if (isSmallScreen) return <SmallNavbar />;
    return <LargerNavbar />;
}

function SmallNavbar() {
    return (
        <NavigationMenuItem>
            <m.div variants={_vTopToNormal} custom={0}>
                <NavigationMenuTrigger className="px-3 py-2 rounded-md font-normal text-sm [&>svg]:hidden">
                    <div className="contents">
                        <HugeiconsIcon
                            icon={Menu01Icon}
                            className="size-4"
                            strokeWidth={2}
                        />
                    </div>
                </NavigationMenuTrigger>
            </m.div>
            <div className="absolute top-full right-0 isolate z-50 flex justify-center">
                <NavigationMenuContent className="flex flex-col gap-2">
                    {_portfolioSections.map((section, i) => (
                        <PortfolioMenuItem
                            key={i}
                            useHover={false}
                            {...section}
                        />
                    ))}

                    <Separator />

                    <PortfolioMenuItem useHover={false} name="CV" href="/cv" />
                </NavigationMenuContent>
            </div>
        </NavigationMenuItem>
    );
}

function LargerNavbar() {
    const isMediumScreen = useMediaQuery("(max-width: 52rem)");

    return (
        <>
            {isMediumScreen ? (
                <DropdownPortfolioMenu />
            ) : (
                <SpreadedPortfolioMenu />
            )}

            <Separator orientation="vertical" className="!h-4" />

            <NavigationMenuItem>
                <m.div
                    variants={_vTopToNormal}
                    custom={isMediumScreen ? 1 : _portfolioSections.length}
                >
                    <PortfolioMenuItem useHover={true} name="CV" href="/cv" />
                </m.div>
            </NavigationMenuItem>
        </>
    );
}

function DropdownPortfolioMenu() {
    return (
        <NavigationMenuItem>
            <m.div variants={_vTopToNormal} custom={0}>
                <NavigationMenuTrigger className="px-3 py-2 rounded-md font-normal text-xs xs:text-sm">
                    Portfolio
                </NavigationMenuTrigger>
            </m.div>
            <div className="absolute top-full left-0 isolate z-50 flex justify-center">
                <NavigationMenuContent className="flex flex-col gap-2">
                    {_portfolioSections.map((section, i) => (
                        <PortfolioMenuItem
                            key={i}
                            useHover={false}
                            {...section}
                        />
                    ))}
                </NavigationMenuContent>
            </div>
        </NavigationMenuItem>
    );
}

function SpreadedPortfolioMenu() {
    return (
        <>
            {_portfolioSections.map((section, i) => (
                <NavigationMenuItem key={i}>
                    <m.div variants={_vTopToNormal} custom={i}>
                        <PortfolioMenuItem useHover={true} {...section} />
                    </m.div>
                </NavigationMenuItem>
            ))}
        </>
    );
}

function PortfolioMenuItem({
    useHover,
    name,
    href,
}: {
    useHover: boolean;
    name: string;
    href: string;
}) {
    return (
        <NavigationMenuLink asChild>
            <NavHashLink
                to={href}
                className={cn(
                    "px-3 py-2 rounded-md text-xs xs:text-sm",
                    useHover &&
                        "transition-colors text-muted-foreground hover:bg-muted/50",
                )}
            >
                {name}
            </NavHashLink>
        </NavigationMenuLink>
    );
}
