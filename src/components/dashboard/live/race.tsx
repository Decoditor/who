import { LiveLeaderboard } from "./leaderboard";
import { LivePodium } from "./live-podium";
import { useLiveRace } from "./use-live-race";

export function LiveRace() {
    const {
        results,
        reactions,
        previousRanks,
    } = useLiveRace();

    return (
        <div className="space-y-8">
            <LivePodium results={results} />

            <div>
                <div className="mb-4">
                    <p className="text-sm text-muted-foreground">
                        Full standings
                    </p>

                    <h2 className="mt-1 text-xl font-semibold tracking-tight">
                        Live leaderboard
                    </h2>
                </div>

                <LiveLeaderboard
                    results={results}
                    previousRanks={previousRanks}
                    reactions={reactions}
                />
            </div>
        </div>
    );
}