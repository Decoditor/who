import { ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BreadcrumbSegment {
    label: string;
    path: string;
}

function formatSegment(segment: string) {
    return decodeURIComponent(segment)
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
}

function buildSegments(pathname: string): BreadcrumbSegment[] {
    const segments = pathname
        .split("/")
        .filter(Boolean);

    return segments.map((segment, index) => ({
        label: formatSegment(segment),
        path: `/${segments.slice(0, index + 1).join("/")}`,
    }));
}

export function AutoBreadcrumb() {
    const { pathname } = useLocation();

    const segments = buildSegments(pathname);

    if (segments.length === 0) {
        return null;
    }

    const currentSegment = segments[segments.length - 1];

    const middleSegments = segments.slice(0, -1);

    const shouldCollapse = middleSegments.length > 1;

    return (
        <div className="mx-auto max-w-360 px-4 py-3 sm:px-6 lg:px-8">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink render={<Link to="/" />}>
                            Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator>
                        <ChevronRight />
                    </BreadcrumbSeparator>

                    {shouldCollapse ? (
                        <>
                            <BreadcrumbItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        render={
                                            <button
                                                type="button"
                                                aria-label="Show breadcrumb navigation"
                                                className="flex items-center gap-1 rounded-md px-2 py-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                                            />
                                        }
                                    >
                                        <BreadcrumbEllipsis />
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent align="start">
                                        {middleSegments.map((segment) => (
                                            <DropdownMenuItem
                                                key={segment.path}
                                                render={
                                                    <Link to={segment.path} />
                                                }
                                            >
                                                {segment.label}
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </BreadcrumbItem>

                            <BreadcrumbSeparator>
                                <ChevronRight />
                            </BreadcrumbSeparator>
                        </>
                    ) : (
                        middleSegments.map((segment) => (
                            <BreadcrumbItem key={segment.path}>
                                <BreadcrumbLink
                                    render={
                                        <Link to={segment.path} />
                                    }
                                >
                                    {segment.label}
                                </BreadcrumbLink>

                                <BreadcrumbSeparator>
                                    <ChevronRight />
                                </BreadcrumbSeparator>
                            </BreadcrumbItem>
                        ))
                    )}

                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            {currentSegment.label}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    );
}