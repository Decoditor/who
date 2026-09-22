import { createBrowserRouter } from "react-router-dom";

import App from "@/App";
import Onboarding from "@/pages";
import Signup from "@/pages/auth/sign-up";
import Login from "@/pages/auth/login";
import RecoveryCode from "@/pages/auth/recovery";

// import PositionSelection from "@/pages/endorsement/position-selection";
// import CandidateSelection from "@/pages/endorsement/candidate-selection";
// import EndorsementReasons from "@/pages/endorsement/reason";
// import ConfirmEndorsement from "@/pages/endorsement/confirm";
// import Success from "@/pages/endorsement/success";
import AuthLayout from "@/pages/auth/layout";
// import EndorsementLayout from "@/pages/endorsement/layout";

import Pick from "@/pages/pick";
import PickLocation from "@/pages/pick/location";
import Candidate from "@/pages/pick/candidate";
import PickSuccess from "@/pages/pick/success";

import { routes } from "./routes";
import PickLayout from "@/pages/pick/layout";
import Memes from "@/pages/memes";
import DangoteMemes from "@/pages/memes/dangote";
import Dashboard from "@/pages/dashboard";
import { DashboardLayout } from "@/components/dashboard/layout";
import Live from "@/pages/dashboard/live";
import DashboardElections from "@/pages/dashboard/election";
import DashboardTemplates from "@/pages/dashboard/templates";
import DashboardPick from "@/pages/dashboard/pick";
import DashboardCandidate from "@/pages/dashboard/candidate";
import Analytics from "@/pages/dashboard/analytics";
import DashboardSettings from "@/pages/dashboard/settings";
import { RequireAuth } from "@/components/auth/required";
import { RequireGuest } from "@/components/auth/guest";

export const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: routes.home,
                Component: Onboarding,
            },

            {
                Component: RequireGuest,
                children: [
                    {
                        Component: AuthLayout,
                        children: [
                            { path: routes.signup, Component: Signup },
                            { path: routes.login, Component: Login },
                            { path: routes.recovery, Component: RecoveryCode },
                        ],
                    },
                ],
            },

            // {
            //     Component: EndorsementLayout,
            //     children: [
            //         {
            //             path: routes.endorsement,
            //             Component: PositionSelection,
            //         },
            //         {
            //             path: routes.candidate,
            //             Component: CandidateSelection,
            //         },
            //         {
            //             path: routes.reason,
            //             Component: EndorsementReasons,
            //         },
            //         {
            //             path: routes.confirm,
            //             Component: ConfirmEndorsement,
            //         },
            //     ],
            // },

            // {
            //     path: routes.endorsementSuccess,
            //     Component: Success,
            // },

            // Who.ng pick flow
            {
                Component: PickLayout,
                children: [
                    {
                        path: routes.pick,
                        Component: Pick,
                    },
                    {
                        path: routes.pickLocation,
                        Component: PickLocation,
                    },
                    {
                        path: routes.pickCandidate,
                        Component: Candidate,
                    },
                    {
                        path: routes.pickSuccess,
                        Component: PickSuccess,
                    },
                ],
            },

            {
                path: routes.memes,
                Component: Memes,
            },
            {
                path: routes.dangoteMemes,
                Component: DangoteMemes,
            },

            {
                path: routes.dangoteMemeTemplate,
                Component: DangoteMemes,
            },
            {
                Component: RequireAuth,
                children: [
                    {
                        path: routes.dashboard,
                        Component: DashboardLayout,
                        children: [
                            {
                                index: true,
                                Component: Dashboard,
                            },
                            {
                                path: "picks",
                                Component: DashboardPick,
                            },
                            {
                                path: "live",
                                Component: Live,
                            },
                            {
                                path: "candidates",
                                Component: DashboardCandidate,
                            },
                            {
                                path: "elections",
                                Component: DashboardElections,
                            },
                            {
                                path: "templates",
                                Component: DashboardTemplates,
                            },
                            {
                                path: "analytics",
                                Component: Analytics,
                            },
                            {
                                path: "settings",
                                Component: DashboardSettings,
                            },
                        ]
                    },

                ],
            },
        ],
    },
]);