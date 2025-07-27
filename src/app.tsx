import { Outlet } from "react-router-dom";
import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import { defaultConfig } from "@/lib/motion-transition";

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
