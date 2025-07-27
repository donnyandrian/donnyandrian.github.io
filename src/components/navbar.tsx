import { NavLink } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { personalData } from "@/data/personal-data";
import * as m from "motion/react-m";
import type { Variants } from "motion/react";
import { delayedConfig } from "@/lib/motion-transition";

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
        <nav className="flex justify-center w-full">
            <div className="flex items-center justify-between w-full">
                <m.div variants={_vTopToNormal} custom={0}>
                    <NavHashLink to="/#" className="flex items-center gap-2">
                        <span className="font-bold text-lg text-xellanix-900">
                            {personalData.name}
                        </span>
                    </NavHashLink>
                </m.div>

                <div className="flex items-center gap-4 text-sm">
                    <m.div variants={_vTopToNormal} custom={0}>
                        <NavHashLink
                            to="/#home"
                            className="px-3 py-2 rounded-md transition-colors text-muted-foreground hover:bg-muted/50"
                        >
                            Home
                        </NavHashLink>
                    </m.div>
                    <m.div variants={_vTopToNormal} custom={1}>
                        <NavHashLink
                            to="/#skills"
                            className="px-3 py-2 rounded-md transition-colors text-muted-foreground hover:bg-muted/50"
                        >
                            Skills
                        </NavHashLink>
                    </m.div>
                    <m.div variants={_vTopToNormal} custom={2}>
                        <NavHashLink
                            to="/#projects"
                            className="px-3 py-2 rounded-md transition-colors text-muted-foreground hover:bg-muted/50"
                        >
                            Projects
                        </NavHashLink>
                    </m.div>
                    <m.div variants={_vTopToNormal} custom={3}>
                        <NavHashLink
                            to="/#achievements"
                            className="px-3 py-2 rounded-md transition-colors text-muted-foreground hover:bg-muted/50"
                        >
                            Achievements
                        </NavHashLink>
                    </m.div>
                    <m.div variants={_vTopToNormal} custom={4}>
                        <NavHashLink
                            to="/#contact"
                            className="px-3 py-2 rounded-md transition-colors text-muted-foreground hover:bg-muted/50"
                        >
                            Contact
                        </NavHashLink>
                    </m.div>

                    <m.div variants={_vTopToNormal} custom={5}>
                        <NavLink
                            to="cv"
                            className={({ isActive }) =>
                                `px-3 py-2 rounded-md transition-colors ${
                                    isActive
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground hover:bg-muted/50"
                                }`
                            }
                        >
                            CV
                        </NavLink>
                    </m.div>
                </div>
            </div>
        </nav>
    );
}
