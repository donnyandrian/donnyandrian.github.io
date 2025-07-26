// src/pages/Portfolio.tsx

import { Button } from "@/components/ui/button";
import { personalData } from "@/data/personal-data";
import {
    useMotionValueEvent,
    useScroll,
    useTransform,
    type Variants,
} from "motion/react";
import * as m from "motion/react-m";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, Download04Icon } from "@hugeicons-pro/core-stroke-rounded";
import { Badge } from "@/components/ui/badge";
import { delayedConfig, transitionEffects } from "@/lib/motion-transition";
import { LinkedList } from "@/components/linked-list";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import ClassName from "embla-carousel-class-names";
import { useMemo, useRef, useState } from "react";

const _vLeftToNormal: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
    },
};

const _vBottomToNormal: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: delayedConfig(index),
    }),
};

const _vFadeInLong: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            ...transitionEffects,
            duration: 10,
        },
    },
};

const _vFadeInShort: Variants = {
    hidden: { opacity: 0 },
    visible: (index: number) => ({
        opacity: 1,
        transition: {
            ...delayedConfig(index, 1),
            duration: 2,
        },
    }),
};

const sections = [
    {
        title: "Every Great Project Starts Here",
        description:
            "Greatness is rarely a single breakthrough. It is the careful assembly of many small, proven components working in perfect harmony.",
    },
    {
        title: "Where Theory Becomes Tangible",
        description:
            "A tool is only potential until it is put to use. This is where individual skills are woven together, transforming abstract concepts into a functional and meaningful whole.",
    },
    {
        title: "A Commitment to the Craft",
        description:
            "Craftsmanship is not a destination, but a continuous journey of refinement. The achievements here mark a formal dedication to that ongoing process of learning, growth, and improvement.",
    },
    {
        title: "Let's Build What's Next",
        description:
            "The most meaningful results are born from collaboration. If this approach and body of work resonates with you, a conversation is the logical next step.",
    },
];

export default function PortfolioPage() {
    const projectsContainer = useRef<HTMLDivElement>(null);
    const projects = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={projectsContainer}
            className="flex flex-col items-center snap-y snap-mandatory *:snap-center *:snap-always *:shrink-0"
        >
            <m.section
                className="flex h-dvh items-center justify-center gap-4 *:text-center max-w-5xl mx-8 flex-col lg:flex-row"
                initial="hidden"
                whileInView="visible"
                viewport={{
                    amount: 0.9,
                }}
            >
                <div
                    className="shrink-1 w-8/10 not-sm:w-full aspect-[7/5] min-h-0 lg:hidden"
                    aria-hidden={true}
                />

                <div className="flex flex-col items-center justify-center gap-4 not-lg:mb-auto">
                    <m.h1
                        className="text-6xl sm:text-7xl font-extrabold"
                        variants={_vLeftToNormal}
                    >
                        <span className="text-accent inline-flex">
                            {personalData.surname}
                        </span>
                        <span className="inline whitespace-nowrap italic">
                            {" "}
                            <span className="text-foreground/30">is</span> Here!
                        </span>
                    </m.h1>

                    <m.p
                        className="max-w-xl mx-4 text-base xs:text-lg"
                        variants={_vLeftToNormal}
                    >
                        {personalData.about}
                    </m.p>

                    <div className="flex lg:flex-col gap-4 items-center justify-center my-2 xs:my-4 select-none">
                        <m.div variants={_vBottomToNormal} custom={0}>
                            <Button
                                asChild
                                size={"lg"}
                                variant={"accent"}
                                className="not-xs:h-10 not-xs:rounded-sm not-xs:gap-1.5 not-xs:px-3 not-xs:has-[>svg]:px-2.5"
                            >
                                <a href={personalData.contact.social[0].url}>
                                    <HugeiconsIcon
                                        icon={Mail01Icon}
                                        className="size-5 xs:size-6"
                                        strokeWidth={2}
                                    />
                                    <span className="text-base xs:text-xl">
                                        Start Hiring
                                    </span>
                                </a>
                            </Button>
                        </m.div>

                        <m.div variants={_vBottomToNormal} custom={1}>
                            <Button
                                variant={"outline"}
                                size={"lg"}
                                asChild
                                className="not-xs:h-10 not-xs:rounded-sm not-xs:gap-1.5 not-xs:px-3 not-xs:has-[>svg]:px-2.5"
                            >
                                <a href="/" download>
                                    <HugeiconsIcon
                                        icon={Download04Icon}
                                        className="size-5 xs:size-6"
                                        strokeWidth={2}
                                    />
                                    <span className="text-sm xs:text-lg">
                                        Get CV
                                    </span>
                                </a>
                            </Button>
                        </m.div>
                    </div>

                    <SummaryFeatures />
                </div>

                <m.div
                    className="aspect-[7/5] w-8/10 not-sm:w-full bg-cover bg-top lg:aspect-[3/4] lg:max-w-2/3 lg:bg-contain lg:bg-bottom lg:h-full lg:-mr-8 bg-no-repeat bg-[url('./hero.webp')]"
                    variants={_vBottomToNormal}
                    custom={2}
                />
            </m.section>

            <m.section
                className="flex h-dvh items-center justify-center gap-4 flex-col max-w-5xl mx-10 z-10 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{
                    amount: 0.5,
                }}
            >
                <m.div
                    className="bg-xellanix-100/70 size-full h-[300%] w-dvw absolute -z-10 pointer-events-none"
                    variants={_vFadeInLong}
                />

                <m.h2 variants={_vFadeInShort} custom={0}>
                    <span>{sections[0].title}</span>
                </m.h2>

                <m.p
                    className="max-w-5xl mx-4 text-base xs:text-lg text-center"
                    variants={_vFadeInShort}
                    custom={1}
                >
                    {sections[0].description}
                </m.p>

                <div className="w-full px-5 xs:px-8">
                    <LinkedList
                        events={personalData.skillsTimeline}
                        className="mt-8"
                    />
                </div>
            </m.section>

            <section
                ref={projects}
                className="flex flex-col w-full max-w-5xl !snap-start *:shrink-0 *:snap-always *:snap-center"
            >
                <m.div
                    className="h-dvh flex items-center justify-center gap-4 flex-col w-full px-10 sticky top-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.5 }}
                >
                    <m.h2 variants={_vLeftToNormal}>
                        <span>{sections[1].title}</span>
                    </m.h2>
                    <m.p
                        className="max-w-5xl mx-4 text-base xs:text-lg text-center"
                        variants={_vLeftToNormal}
                    >
                        {sections[1].description}
                    </m.p>

                    <ProjectCarousel cref={projectsContainer} pref={projects} />
                </m.div>

                <ProjectScrollSpace />
            </section>

            <m.section
                className="flex h-dvh items-center justify-center gap-4 flex-col w-full max-w-5xl px-10"
                initial="hidden"
                whileInView="visible"
                viewport={{
                    amount: 0.5,
                }}
            >
                <m.h2>
                    <span>{sections[2].title}</span>
                </m.h2>
                <m.p className="max-w-5xl mx-4 text-base xs:text-lg text-center">
                    {sections[2].description}
                </m.p>
            </m.section>

            <m.section
                className="flex h-dvh items-center justify-center gap-4 flex-col w-full max-w-5xl px-10"
                initial="hidden"
                whileInView="visible"
                viewport={{
                    amount: 0.5,
                }}
            >
                <m.h2>
                    <span>{sections[3].title}</span>
                </m.h2>
                <m.p className="max-w-5xl mx-4 text-base xs:text-lg text-center">
                    {sections[3].description}
                </m.p>
            </m.section>
        </div>
    );
}

function SummaryFeatures() {
    const features = personalData.summaryFeatures;

    if (!features) {
        return undefined;
    }

    return (
        <div className="flex gap-3 xs:gap-4 flex-wrap items-center justify-center mx-8 select-none">
            {features.map((feature, index) => (
                <m.div key={feature} variants={_vBottomToNormal} custom={index}>
                    <Badge variant={"secondary"} className="text-xs xs:text-sm">
                        {feature}
                    </Badge>
                </m.div>
            ))}
        </div>
    );
}

function ProjectCarousel({
    cref,
    pref,
}: {
    cref: React.RefObject<HTMLDivElement | null>;
    pref: React.RefObject<HTMLDivElement | null>;
}) {
    const [api, setApi] = useState<CarouselApi>();
    const { scrollYProgress } = useScroll({
        target: pref,
        offset: ["start start", "end end"],
        container: cref,
    });
    const scrollIndex = useTransform(() => {
        const n = personalData.projects.length;
        return Math.min(Math.floor(scrollYProgress.get() * n), n - 1);
    });

    useMotionValueEvent(scrollIndex, "change", (latest) => {
        const index = Math.round(latest);
        console.log(index);

        api?.scrollTo(index);
    });

    return (
        <m.div
            className="flex items-center justify-center gap-4 flex-col w-full max-w-[70dvw] mt-8"
            variants={_vFadeInShort}
            custom={0.25}
            style={{ x: scrollYProgress }}
        >
            <Carousel
                className="w-full"
                setApi={setApi}
                opts={{ loop: true, watchDrag: false }}
                plugins={[ClassName()]}
            >
                <CarouselContent>
                    {personalData.projects.map((project, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-2/3 select-none"
                        >
                            <m.div
                                variants={_vFadeInShort}
                                custom={
                                    pyramidIndex(
                                        index,
                                        personalData.projects.length,
                                    ) / 3
                                }
                            >
                                <div className="bg-accent text-card-foreground flex rounded-md border-4 aspect-video opacity-30 transition-all duration-300 ease-out in-[.is-snapped]:opacity-100">
                                    {index}
                                </div>
                            </m.div>

                            <div className="flex flex-col gap-2 text-center w-full mt-4 relative opacity-0 transition-all duration-300 ease-out in-[.is-snapped]:opacity-100">
                                <h3 className="font-semibold text-lg xs:text-xl text-accent relative">
                                    {project.title}
                                </h3>
                                <p className={"text-sm xs:text-base xs:mx-12"}>
                                    {project.description}
                                </p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </m.div>
    );
}

const pyramidIndex = (index: number, total: number) =>
    index <= Math.trunc(total / 2) ? index : total - index;

function ProjectScrollSpace() {
    const spaces = useMemo(() => {
        const _spaces = [];

        for (let i = 0; i < personalData.projects.length - 2; i++) {
            _spaces.push(<div key={i} className="h-dvh shrink-0" />);
        }

        return _spaces;
    }, [personalData.projects.length]);

    return (
        <>
            {spaces}
            <div className="h-dvh shrink-0 !snap-end" />
        </>
    );
}
