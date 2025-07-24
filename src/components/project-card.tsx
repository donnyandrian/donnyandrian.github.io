import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { ArrowUpRight } from "lucide-react";

interface Props {
  title: string;
  description: string;
  tags: readonly string[];
  link?: {
    href: string;
    label: string;
  };
}

export function ProjectCard({ title, description, tags, link }: Props) {
  return (
    <Card className="flex flex-col overflow-hidden bg-card/50 backdrop-blur-sm border-border/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-4">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">
            {title}
          </CardTitle>
          <CardDescription className="font-mono text-xs">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 mt-auto flex flex-col">
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge
              className="px-1.5 py-0.5 text-[10px] font-normal"
              variant="secondary"
              key={tag}
            >
              {tag}
            </Badge>
          ))}
        </div>
        {link && (
          <a
            href={link.href}
            target="_blank"
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground/80 hover:text-foreground group"
          >
            <span>{link.label}</span>
            <ArrowUpRight className="h-4 w-4 transform transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}
      </CardContent>
    </Card>
  );
}