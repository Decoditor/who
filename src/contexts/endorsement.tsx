import { createContext, useContext, useState } from "react";

import type { Candidate, Position } from "@/types";
import { Outlet } from "react-router-dom";

interface EndorsementDraft {
    position: Position | null;
    candidate: Candidate | null;
    reasons: string[];
}

interface EndorsementContextValue {
    draft: EndorsementDraft;
    setPosition: (position: Position) => void;
    setCandidate: (candidate: Candidate) => void;
    setReasons: (reasons: string[]) => void;
    clearDraft: () => void;
}

const initialDraft: EndorsementDraft = {
    position: null,
    candidate: null,
    reasons: [],
};

const EndorsementContext = createContext<
    EndorsementContextValue | undefined
>(undefined);

export function EndorsementProvider() {
    const [draft, setDraft] = useState<EndorsementDraft>(initialDraft);

    const setPosition = (position: Position) => {
        setDraft({
            position,
            candidate: null,
            reasons: [],
        });
    };

    const setCandidate = (candidate: Candidate) => {
        setDraft((current) => ({
            ...current,
            candidate,
            reasons: [],
        }));
    };

    const setReasons = (reasons: string[]) => {
        setDraft((current) => ({
            ...current,
            reasons,
        }));
    };

    const clearDraft = () => {
        setDraft(initialDraft);
    };

    return (
        <EndorsementContext.Provider
            value={{
                draft,
                setPosition,
                setCandidate,
                setReasons,
                clearDraft,
            }}
        >
            <Outlet />
        </EndorsementContext.Provider>
    );
}

export function useEndorsement() {
    const context = useContext(EndorsementContext);

    if (!context) {
        throw new Error(
            "useEndorsement must be used inside EndorsementProvider",
        );
    }

    return context;
}