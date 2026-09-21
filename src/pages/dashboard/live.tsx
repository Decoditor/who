import { Activity, Radio, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { LiveRace } from "../../components/dashboard/live/race";

export default function DashboardLive() {
    return (
        <div className="mx-auto w-full max-w-360 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="space-y-8">
                <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                    <div className="hidden md:inline">
                        <div className="flex items-center gap-2">
                            <Badge
                                variant="secondary"
                                className="gap-1.5 rounded-full"
                            >
                                <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                                Live
                            </Badge>

                            <span className="text-sm text-muted-foreground">
                                Demo data
                            </span>
                        </div>

                        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Live picks
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                            See how picks are distributed across
                            the current election in real time.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Select defaultValue="presidential">
                            <SelectTrigger className="w-48">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="presidential">
                                    Presidential
                                </SelectItem>

                                <SelectItem value="governorship">
                                    Governorship
                                </SelectItem>

                                <SelectItem value="senate">
                                    Senate
                                </SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="outline">
                            <RefreshCw />
                            Refresh
                        </Button>
                    </div>
                </section>

                <LiveRace />
            </div>
        </div>
    );
}