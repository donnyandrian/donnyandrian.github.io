import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { personalData } from "@/data/personal-data";
import { motion, type Variants } from "motion/react";

const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
} satisfies Variants;

const sections = [
    {
        title: "About",
        content: (
            <p className="text-pretty font-mono text-sm text-muted-foreground">
                {personalData.summary}
            </p>
        ),
    },
    {
        title: "Work Experience",
        content: personalData.work.map((work) => (
            <Card key={work.company}>
                <CardHeader>
                    <div className="flex items-center justify-between gap-x-2 text-base">
                        <h3 className="font-semibold leading-none">
                            {work.title}
                        </h3>
                        <div className="text-sm tabular-nums text-gray-500">
                            {work.start} - {work.end}
                        </div>
                    </div>
                    <h4 className="font-mono text-sm leading-none">
                        {work.company}
                    </h4>
                </CardHeader>
                <CardContent className="mt-2 text-xs">
                    {work.description}
                </CardContent>
            </Card>
        )),
    },
    {
        title: "Education",
        content: personalData.education.map((education) => (
            <Card key={education.school}>
                <CardHeader>
                    <div className="flex items-center justify-between gap-x-2 text-base">
                        <h3 className="font-semibold leading-none">
                            {education.school}
                        </h3>
                        <div className="text-sm tabular-nums text-gray-500">
                            {education.start} - {education.end}
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="mt-2">{education.degree}</CardContent>
            </Card>
        )),
    },
    {
        title: "Skills",
        content: (
            <div className="flex flex-wrap gap-1">
                {personalData.skills.map((skill) => (
                    <Badge key={skill}>{skill}</Badge>
                ))}
            </div>
        ),
    },
];

export default function CVPage() {
    return (
        <div className="mx-auto w-full max-w-2xl space-y-8">
            {sections.map((section, index) => (
                <motion.section
                    key={section.title}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={sectionVariants}
                    className="w-full space-y-4"
                >
                    <h2 className="text-xl font-bold">{section.title}</h2>
                    <div className="space-y-4">{section.content}</div>
                </motion.section>
            ))}
        </div>
    );
}
