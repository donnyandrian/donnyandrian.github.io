import { stagger, type Transition } from "motion/react";

export const transitionEffects: Transition = {
    type: "spring",
    bounce: 0.2,
    ease: "easeOut",
};

export const staggerConfig = (duration: number = 0.1) => ({
    delayChildren: stagger(duration),
    ...transitionEffects,
});

export const defaultConfig: Transition = staggerConfig();

export const delayedConfig = (
    index: number,
    duration: number = 0.1,
    startDelay: number = 0,
) =>
    ({
        delay: index * duration + startDelay,
        ...transitionEffects,
    }) as Transition;
