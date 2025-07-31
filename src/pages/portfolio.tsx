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
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Download04Icon } from "@hugeicons-pro/core-stroke-rounded";
import { Badge } from "@/components/ui/badge";
import {
    defaultConfig,
    delayedConfig,
    transitionEffects,
} from "@/lib/motion-transition";
import { LinkedList } from "@/components/linked-list";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import ClassName from "embla-carousel-class-names";
import { useMemo, useRef, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Separator } from "@/components/ui/separator";

const _vLeftToNormal: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
        opacity: 1,
        x: 0,
    },
};

const _vRightCustomToNormal: Variants = {
    hidden: (custom: number = 1) => ({ opacity: 0, x: 50 * custom }),
    visible: {
        opacity: 1,
        x: 0,
    },
};

const _vTopCustomToNormal: Variants = {
    hidden: (custom: number = 1) => ({ opacity: 0, y: -50 * custom }),
    visible: {
        opacity: 1,
        y: 0,
        transition: defaultConfig,
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

const _vBottomRightToNormal: Variants = {
    hidden: { opacity: 0, y: 50, x: 50 },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        x: 0,
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
        title: <>Every Great Project Starts Here</>,
        description:
            "Greatness is rarely a single breakthrough. It is the careful assembly of many small, proven components working in perfect harmony.",
    },
    {
        title: (
            <>
                From{" "}
                <span className="text-xellanix-900">
                    Blueprint <span className="text-accent">to</span> Tangible
                </span>{" "}
                Form
            </>
        ),
        description:
            "A plan is only a promise of what could be. True value is created only when intellect is forged into action, transforming a vision into a concrete reality that can be seen and used.",
    },
    {
        title: (
            <>
                <m.span
                    className="text-xellanix-900/30 inline-block"
                    variants={_vTopCustomToNormal}
                    custom={0.75}
                >
                    The
                </m.span>{" "}
                <m.span
                    className="inline-block"
                    variants={_vTopCustomToNormal}
                    custom={0.75}
                >
                    Pursuit
                </m.span>{" "}
                <m.span
                    className="inline-block"
                    variants={_vTopCustomToNormal}
                    custom={0.75}
                >
                    of
                </m.span>{" "}
                <m.span
                    className="text-accent text-shadow-hard-lg text-shadow-xellanix-200/75 inline-block"
                    variants={_vTopCustomToNormal}
                    custom={0.75}
                >
                    Mastery
                </m.span>
            </>
        ),
        description:
            "Craftsmanship is not a destination, but a continuous journey of refinement. The achievements here mark a formal dedication to that ongoing process of learning, growth, and improvement.",
    },
    {
        title: (
            <>
                <span className="inline-block border-b-4 border-accent">
                    Let's Build
                </span>{" "}
                <span className="italic">
                    <span className="text-xellanix-900/30">What's</span>{" "}
                    <span className="text-accent">Next</span>
                </span>
            </>
        ),
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
                id="home"
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
                        <span className="inline whitespace-nowrap italic text-xellanix-900">
                            {" "}
                            <span className="text-xellanix-900/30">
                                is
                            </span>{" "}
                            Here!
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
                            <HireButton />
                        </m.div>

                        <m.div variants={_vBottomToNormal} custom={1}>
                            <DownloadCVButton />
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
                id="skills"
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
                    <span className="text-transparent bg-clip-text bg-linear-35/oklch from-xellanix-900 from-35% to-xellanix-900/10 box-decoration-clone">
                        {sections[0].title}
                    </span>
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
                id="projects"
                ref={projects}
                className="flex flex-col w-full !snap-start *:shrink-0 *:snap-always *:snap-center"
            >
                <m.div
                    className="h-dvh flex items-center justify-center gap-4 flex-col w-full max-w-5xl mx-auto px-10 sticky top-0"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ amount: 0.5 }}
                >
                    <m.h2 variants={_vLeftToNormal}>
                        <div className="font-extrabold text-4.5xl xs:text-5xl sm:text-6xl text-xellanix-900/30">
                            {sections[1].title}
                        </div>
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
                id="achievements"
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
                <m.p
                    className="max-w-5xl mx-4 text-base xs:text-lg text-center"
                    variants={_vTopCustomToNormal}
                    custom={1}
                >
                    {sections[2].description}
                </m.p>
            </m.section>

            <m.section
                id="contact"
                className="@container/contact flex h-dvh items-center justify-center gap-4 xs:gap-6 sm:gap-8 flex-col sm:flex-row w-full max-w-7xl px-10 sm:px-16 md:px-24 relative"
                initial="hidden"
                whileInView="visible"
                viewport={{
                    amount: 0.5,
                }}
            >
                <m.div
                    className="w-full absolute top-0 px-10 sm:px-16 md:px-24 h-16 flex items-center"
                    variants={{
                        hidden: { opacity: 0, visibility: "hidden" },
                        visible: {
                            opacity: 1,
                            visibility: "visible",
                            transition: {
                                ...delayedConfig(1, 1),
                                duration: 1,
                            },
                        },
                    }}
                >
                    <Navbar />
                </m.div>

                <div className="flex flex-col items-start justify-center gap-4 sm:h-full">
                    <m.h2 className="text-left" variants={_vLeftToNormal}>
                        <div className="font-extrabold text-4.5xl xs:text-5xl sm:text-6xl text-xellanix-900 flex flex-col gap-y-2 items-start">
                            {sections[3].title}
                        </div>
                    </m.h2>
                    <m.p
                        className="text-base xs:text-lg text-left"
                        variants={_vLeftToNormal}
                    >
                        {sections[3].description}
                    </m.p>

                    <div className="flex flex-row gap-4 items-center justify-center my-2 xs:my-4 select-none">
                        <m.div variants={_vBottomToNormal} custom={0}>
                            <HireButton />
                        </m.div>

                        <m.div variants={_vBottomToNormal} custom={1}>
                            <DownloadCVButton />
                        </m.div>
                    </div>
                </div>

                <Separator
                    orientation="vertical"
                    className="!h-1/2 !w-0 border-l-2 border-dashed border-xellanix-900/30 bg-transparent not-sm:hidden"
                />

                <div className="flex items-start not-sm:w-full gap-x-8 gap-y-4 xs:gap-x-12 xs:gap-y-6 sm:gap-x-16 sm:gap-y-8 not-sm:flex-row flex-col @3.5xl/contact:flex-row sm:py-8 not-sm:flex-wrap not-sm:mt-8 @max-3xs/contact:[&>ul:last-child]:flex-row @max-3xs/contact:[&>ul:last-child]:gap-x-8 not-sm:[&>ul:first-child]:w-4/10 @max-2xs/contact:[&>ul:first-child]:w-9/20">
                    <ContactList />
                </div>
            </m.section>
        </div>
    );
}

function HireButton() {
    return (
        <Button
            asChild
            size={"lg"}
            variant={"accent"}
            className="not-xs:h-10 not-xs:rounded-sm not-xs:gap-1.5 not-xs:px-3 not-xs:has-[>svg]:px-2.5"
        >
            <a href={personalData.contact.social[2].url}>
                <HugeiconsIcon
                    icon={personalData.contact.social[2].icon}
                    className="size-5 xs:size-6"
                    strokeWidth={2}
                />
                <span className="text-sm xs:text-lg">Start Hiring</span>
            </a>
        </Button>
    );
}

function DownloadCVButton() {
    return (
        <Button
            size={"lg"}
            variant={"outline"}
            asChild
            className="not-xs:h-10 not-xs:rounded-sm not-xs:gap-1.5 not-xs:px-3 not-xs:has-[>svg]:px-2.5"
        >
            <a href="/" download>
                <HugeiconsIcon
                    icon={Download04Icon}
                    className="size-5 xs:size-6"
                    strokeWidth={2}
                />
                <span className="text-sm xs:text-lg">Get CV</span>
            </a>
        </Button>
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

    useMotionValueEvent(scrollIndex, "change", (latest) =>
        api?.scrollTo(latest),
    );

    return (
        <m.div
            className="flex items-center justify-center gap-4 flex-col w-full max-w-[70dvw] mt-8"
            variants={_vFadeInShort}
            custom={0.25}
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
                            className="basis-2/3 select-none flex flex-col items-center"
                        >
                            <m.div
                                className="w-full"
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

                            <m.div
                                className="flex flex-col gap-2 text-center w-3/2 mt-4 relative"
                                initial="hidden"
                                whileInView="visible"
                                transition={{
                                    ...defaultConfig,
                                    delay: 0.15,
                                }}
                                viewport={{ amount: 0.95 }}
                                custom={2}
                            >
                                <m.h3
                                    className="font-bold text-lg xs:text-xl text-accent relative"
                                    variants={_vRightCustomToNormal}
                                >
                                    {project.title}
                                </m.h3>
                                <m.p
                                    className={"text-xs xs:text-sm xs:mx-12"}
                                    variants={_vRightCustomToNormal}
                                >
                                    {project.description}
                                </m.p>
                            </m.div>
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

        const desiredLength =
            Math.ceil(personalData.projects.length * 0.75) - 2;

        for (let i = 0; i < desiredLength; i++) {
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

function ContactList() {
    const list = useMemo(() => {
        const split = [];
        const batchSize = 3;
        const socials = personalData.contact.social;

        for (let i = 0; i < socials.length; i += batchSize) {
            const fragments = [];
            for (const social of socials.slice(i, i + batchSize)) {
                const t = i + fragments.length;

                fragments.push(<ContactItem key={t} order={t} {...social} />);
            }

            split.push(
                <ul
                    className="flex flex-col items-center justify-center gap-4 xs:gap-8 max-h-[calc(100dvh-8rem)]"
                    key={i}
                >
                    {fragments}
                </ul>,
            );
        }

        return split;
    }, [personalData.contact.social]);

    return <>{list}</>;
}

function ContactItem({
    text,
    icon,
    url,
    name,
    order,
}: {
    text: string;
    icon: IconSvgElement;
    url: string;
    name: string;
    order: number;
}) {
    return (
        <m.li
            className="flex flex-col items-start w-full"
            variants={_vBottomRightToNormal}
            custom={order}
        >
            <div className="flex flex-row gap-1 xs:gap-2 items-center">
                <HugeiconsIcon
                    icon={icon}
                    strokeWidth={2}
                    className="size-4 xs:size-5"
                />
                <div className="font-bold inline-flex text-nowrap text-sm xs:text-base">
                    {name}
                </div>
            </div>
            <Button
                variant={"link"}
                size={"link"}
                asChild
                className="ml-5 xs:ml-7 text-xs xs:text-sm py-0.5 xs:py-1"
            >
                <a href={url} target="_blank">
                    {text}
                </a>
            </Button>
        </m.li>
    );
}
