import { NavLink, Outlet } from "react-router-dom";
import { personalData } from "@/data/personal-data";
import { domAnimation, LazyMotion, motion, MotionConfig } from "motion/react";
import { defaultConfig } from "@/lib/motion-transition";

// @ts-ignore
function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex justify-center py-4"
        >
            <div className="flex items-center justify-between w-full max-w-2xl px-4">
                <NavLink to="/" className="flex items-center gap-2">
                    <span className="font-bold text-lg">
                        {personalData.name}
                    </span>
                </NavLink>
                <div className="flex items-center gap-4 text-sm">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-md transition-colors ${
                                isActive
                                    ? "bg-muted text-primary"
                                    : "text-muted-foreground hover:bg-muted/50"
                            }`
                        }
                    >
                        Portfolio
                    </NavLink>
                    <NavLink
                        to="/cv"
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
                </div>
            </div>
        </motion.nav>
    );
}

export default function RootLayout() {
    return (
        <div className="h-dvh overflow-hidden">
            <main className="relative h-dvh *:h-dvh *:overflow-y-auto *:overflow-x-hidden">
                <MotionConfig transition={defaultConfig}>
                    <LazyMotion features={domAnimation}>
                        <Outlet />
                    </LazyMotion>
                </MotionConfig>
            </main>
        </div>
    );
}
