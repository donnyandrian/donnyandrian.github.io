import { countYears, date } from "@/lib/utils";
import type { TimelineEvent } from "@/types";
import {
    GithubIcon,
    InstagramIcon,
    LinkedinIcon,
    Mail01Icon,
} from "@hugeicons-pro/core-stroke-rounded";

const skillsTimeline: TimelineEvent[] = [
    { name: "C#", icon: "cs", startDate: date(2017), endDate: date(2020) },
    {
        name: "Windows App SDK",
        icon: "windows",
        startDate: date(2017),
        endDate: date(2026),
    },
    { name: "C++", icon: "cpp", startDate: date(2020), endDate: date(2026) },
    {
        name: "JavaScript",
        icon: "js",
        startDate: date(2024, 3),
        endDate: undefined,
    },
    {
        name: "TypeScript",
        icon: "ts",
        startDate: date(2024, 7),
        endDate: undefined,
    },
    {
        name: "React",
        icon: "react",
        startDate: date(2024, 4),
        endDate: undefined,
    },
    {
        name: "Node.js",
        icon: "nodejs",
        startDate: date(2024, 4),
        endDate: undefined,
    },
    {
        name: "Vite",
        icon: "vite",
        startDate: date(2024, 4),
        endDate: undefined,
    },
    {
        name: "Next.js",
        icon: "nextjs",
        startDate: date(2024, 9),
        endDate: undefined,
    },
    {
        name: "Tailwind CSS",
        icon: "tailwind",
        startDate: date(2024, 12),
        endDate: undefined,
    },
    {
        name: "Adobe",
        icon: "adobe",
        startDate: date(2019),
        endDate: undefined,
    },
    {
        name: "DaVinci Resolve",
        icon: "drs",
        startDate: date(2023),
        endDate: undefined,
    },
    {
        name: "Figma",
        icon: "figma",
        startDate: date(2023, 9),
        endDate: undefined,
    },
    {
        name: "Java",
        icon: "java",
        startDate: date(2024, 9),
        endDate: date(2025, 8),
    },
    {
        name: "Git",
        icon: "git",
        startDate: date(2022, 12),
        endDate: undefined,
    },
];

export const personalData = {
    name: "Donny Andrian",
    surname: "Donny",
    summaryFeatures: [
        `${Math.floor(countYears(skillsTimeline[5].startDate, skillsTimeline[5].endDate))}yr React TS/JS`,
        `${Math.floor(countYears(skillsTimeline[2].startDate, skillsTimeline[2].endDate))}yr C++`,
        `${Math.floor(countYears(skillsTimeline[0].startDate, skillsTimeline[0].endDate))}yr C#`,
        `${Math.floor(countYears(skillsTimeline[1].startDate, skillsTimeline[1].endDate))}yr Windows App Dev`,
        "4.0 GPA",
    ],
    initials: "DA",
    location: "Pontianak, Indonesia",
    locationLink: "https://www.google.com/maps/place/Pontianak",
    about: "Detail-oriented Frontend Developer with a passion for creating responsive and user-friendly web applications.",
    summary:
        "As a Frontend Developer with over 3 years of experience, I specialize in building robust and scalable applications using React, TypeScript, and modern web technologies. I have a proven track record of delivering high-quality code and collaborating effectively in agile environments. My goal is to leverage my skills to build innovative solutions that provide an exceptional user experience.",
    avatarUrl: "https://avatars.githubusercontent.com/u/1000000?v=4", // Replace with your avatar URL
    contact: {
        social: [
            {
                name: "Instagram",
                url: "https://www.instagram.com/do.and.voidptr/",
                text: "@do.and.voidptr",
                icon: InstagramIcon,
            },
            {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/donny-andrian-x05/",
                text: "donny-andrian-x05",
                icon: LinkedinIcon,
            },
            {
                name: "Email",
                url: `mailto:donnyandrian18@gmail.com`,
                text: "donnyandrian18@gmail.com",
                icon: Mail01Icon,
            },
            {
                name: "GitHub",
                url: "https://github.com/xellanix",
                text: "@xellanix",
                icon: GithubIcon,
            },
            {
                name: "GitHub",
                url: "https://github.com/donnyandrian",
                text: "@donnyandrian",
                icon: GithubIcon,
            },
        ],
    },
    education: [
        {
            school: "University of California, Berkeley",
            degree: "Bachelor's Degree in Computer Science",
            start: "2018",
            end: "2022",
        },
    ],
    work: [
        {
            company: "Tech Solutions Inc.",
            link: "https://techsolutions.example.com",
            badges: ["Remote"],
            title: "Frontend Developer",
            start: "2022",
            end: "Present",
            description:
                "Developed and maintained user-facing features for a large-scale e-commerce platform using React and TypeScript. Improved application performance by 20% by optimizing state management and rendering logic. Collaborated with designers to implement pixel-perfect UIs.",
        },
        {
            company: "Web Innovations LLC",
            link: "https://webinnovations.example.com",
            badges: ["On-Site"],
            title: "Junior Web Developer",
            start: "2021",
            end: "2022",
            description:
                "Assisted in the development of client websites using HTML, CSS, and JavaScript. Gained hands-on experience with modern frameworks and build tools. Contributed to a 15% reduction in bug reports by implementing unit tests.",
        },
    ],
    skills: [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Next.js",
        "Tailwind CSS",
    ],
    skillsTimeline: skillsTimeline,
    projects: [
        {
            title: "Xellanix TwiVent",
            techStack: [
                "TypeScript",
                "React",
                "Vite",
                "Tailwind CSS",
                "TensorFlow.js",
                "Web Workers",
            ],
            description:
                "A website to make it easy to apply your photos to registered twibbons, for FREE. This website has been integrated with machine learning models, to speed up the photo adjustment process, so that the results are maximized.",
            hero: "./projects/twivent/index.png",
            link: {
                homepage: "https://xellanix.github.io/twivent/",
                github: "https://github.com/xellanix/twivent/",
            },
        },
        {
            title: "Xellanix Ambient",
            techStack: [
                "TypeScript",
                "React",
                "Vite",
                "Tailwind CSS",
                "PWA",
                "WebView",
                "C++",
                "libVLC",
                "MediaInfo",
            ],
            description:
                "A website to play and display lyrics based on the song added. The focus of this website is on a unique and animated look.",
            hero: "./projects/ambient/index.png",
            link: {
                homepage: "https://xellanix.github.io/ambient/",
                github: "https://github.com/xellanix/xellanix-ambient/",
            },
        },
        {
            title: "Xellanix QuickSeeker",
            techStack: [
                "TypeScript",
                "React",
                "Vite",
                "Tailwind CSS",
                "Web Workers",
                "Convex",
                "React Router",
            ],
            description:
                "A concise data set management website, with powerful features that give you a quick overview of the data set. It also provides predictive results based on dynamic interpolation.",
            hero: "./projects/quick-seeker/index.png",
            link: {
                homepage: "https://quick-seeker.netlify.app/",
                github: "https://github.com/xellanix/quick-seeker/",
            },
        },
        {
            title: "My Portfolio",
            techStack: [
                "TypeScript",
                "React",
                "Vite",
                "Tailwind CSS",
                "Framer Motion",
                "React Router",
            ],
            description:
                "A portfolio that shows some of the skills and results acquired by me during my journey from school to now.",
            hero: "./projects/my-porto/index.png",
            link: {
                homepage: "https://donnyandrian.github.io/",
                github: "https://github.com/donnyandrian/donnyandrian.github.io",
            },
        },
        {
            title: "Xellanix ImageMerger",
            techStack: ["C++", "Windows App SDK", "WinRT"],
            description:
                "A utility application for merging multiple images from a file or clipboard, including screenshots, into a new file.",
            hero: "./projects/image-merge/index.png",
            link: {
                github: "https://github.com/xellanix/imagemerger",
            },
        },
        {
            title: "Xellanix PickColor",
            techStack: ["C++", "Windows App SDK", "WinRT"],
            description:
                "A simple app to quickly capture colors on the screen, as well as provide several color variants related to the selected color.",
            hero: "./projects/pick-color/index.png",
            link: {
                github: "https://github.com/xellanix/pickcolor-src",
            },
        },
        {
            title: "Xellanix QuickRename",
            techStack: ["C++", "Windows App SDK", "WinRT"],
            description:
                "A utility application for renaming multiple files (and folders) at once with the desired format, such as order, date, etc.",
            hero: "./projects/quick-rename/index.png",
            link: {
                github: "https://github.com/xellanix/quickrename-src",
            },
        },
    ],
} as const;
