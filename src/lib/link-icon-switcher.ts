import { GithubIcon, Link04Icon } from "@hugeicons-pro/core-stroke-rounded";

export function SwitchIconLink(type: string) {
    switch (type) {
        case "github":
            return GithubIcon;
        case "homepage":
        default:
            return Link04Icon;
    }
}
