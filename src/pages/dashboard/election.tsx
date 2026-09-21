import {
    CalendarDays,
    ChevronRight,
    CircleCheck,
    Clock3,
    Plus,
    Vote,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { elections, type ElectionStatus } from "@/data/dashboard/election";

function getStatusLabel(status: ElectionStatus) {
    switch (status) {
        case "active":
            return "Active";
        case "upcoming":
            return "Upcoming";
        case "completed":
            return "Completed";
    }
}

function StatusBadge({ status }: { status: ElectionStatus }) {
    if (status === "active") {
        return (
            <Badge variant="default" className="gap-1.5 rounded-full">
                <span className="size-1.5 rounded-full bg-primary-foreground" />
                Active
            </Badge>
        );
    }

    if (status === "completed") {
        return (
            <Badge variant="secondary" className="gap-1.5 rounded-full">
                <CircleCheck className="size-3" />
                Completed
            </Badge>
        );
    }

    return (
        <Badge variant="outline" className="gap-1.5 rounded-full">
            <Clock3 className="size-3" />
            Upcoming
        </Badge>
    );
}

export default function DashboardElections() {
    const activeCount = elections.filter(
        (election) => election.status === "active",
    ).length;

    const upcomingCount = elections.filter(
        (election) => election.status === "upcoming",
    ).length;

    // const completedCount = elections.filter(
    //     (election) => election.status === "completed",
    // ).length;

    const totalCandidates = elections.reduce(
        (total, election) => total + election.candidateCount,
        0,
    );

    return (
        <div className="mx-auto w-full max-w-360 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            <div className="space-y-8">
                <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Vote className="size-4" />
                            Election management
                        </div>

                        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
                            Elections
                        </h1>

                        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                            Manage the elections available across Who.ng and
                            configure their voting data.
                        </p>
                    </div>

                    <Button>
                        <Plus />
                        Add election
                    </Button>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total elections
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-3xl font-semibold tracking-tight">
                                {elections.length}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Election types configured
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Active
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-3xl font-semibold tracking-tight">
                                {activeCount}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Currently available
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Upcoming
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-3xl font-semibold tracking-tight">
                                {upcomingCount}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Awaiting activation
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Candidates
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            <p className="text-3xl font-semibold tracking-tight">
                                {totalCandidates.toLocaleString()}
                            </p>

                            <p className="mt-1 text-xs text-muted-foreground">
                                Across configured elections
                            </p>
                        </CardContent>
                    </Card>
                </section>

                <Card className="overflow-hidden">
                    <CardHeader className="border-b border-border">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <CardTitle>All elections</CardTitle>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Election types currently configured for
                                    Who.ng.
                                </p>
                            </div>

                            <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                                <CalendarDays className="size-4" />
                                {new Date().getFullYear()}
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Election</TableHead>
                                        <TableHead>Scope</TableHead>
                                        <TableHead>Year</TableHead>
                                        <TableHead>Candidates</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="w-12" />
                                    </TableRow>
                                </TableHeader>

                                <TableBody>
                                    {elections.map((election) => (
                                        <TableRow key={election.id}>
                                            <TableCell>
                                                <div className="min-w-52">
                                                    <p className="font-medium">
                                                        {election.name}
                                                    </p>

                                                    <p className="mt-1 text-xs text-muted-foreground">
                                                        {election.description}
                                                    </p>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <span className="text-sm text-muted-foreground">
                                                    {election.scope}
                                                </span>
                                            </TableCell>

                                            <TableCell>
                                                <span className="tabular-nums">
                                                    {election.year}
                                                </span>
                                            </TableCell>

                                            <TableCell>
                                                <span className="tabular-nums">
                                                    {election.candidateCount.toLocaleString()}
                                                </span>
                                            </TableCell>

                                            <TableCell>
                                                <StatusBadge
                                                    status={election.status}
                                                />
                                            </TableCell>

                                            <TableCell>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    aria-label={`Open ${getStatusLabel(
                                                        election.status,
                                                    ).toLowerCase()} ${election.name}`}
                                                >
                                                    <ChevronRight />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}