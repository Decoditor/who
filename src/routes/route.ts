import { createBrowserRouter } from "react-router-dom";
import Onboarding from "@/pages";
import { routes } from "./routes";
import Signup from "@/pages/auth/sign-up";
import Login from "@/pages/auth/login";
import RecoveryCode from "@/pages/auth/recovery";
import PositionSelection from "@/pages/endorsement/position-selection";
import CandidateSelection from "@/pages/endorsement/candidate-selection";
import EndorsementReasons from "@/pages/endorsement/reason";
import App from "@/App";
import AuthLayout from "@/pages/auth/layout";
import EndorsementLayout from "@/pages/endorsement/layout";
import ConfirmEndorsement from "@/pages/endorsement/confirm";
import Success from "@/pages/endorsement/success";
import Dashboard from "@/pages/dashboard";

export const router = createBrowserRouter([
    {
        Component: App,
        children: [
            {
                path: routes.home,
                Component: Onboarding
            },
            {
                Component: AuthLayout,
                children: [
                    {
                        path: routes.signup,
                        Component: Signup
                    },
                    {
                        path: routes.login,
                        Component: Login
                    },
                    {
                        path: routes.recovery,
                        Component: RecoveryCode
                    },
                ]
            },
            {
                Component: EndorsementLayout,
                children: [
                    {
                        path: routes.endorsement,
                        Component: PositionSelection
                    },
                    {
                        path: routes.candidate,
                        Component: CandidateSelection
                    },
                    {
                        path: routes.reason,
                        Component: EndorsementReasons
                    },
                    {
                        path: routes.confirm,
                        Component: ConfirmEndorsement
                    },

                ]
            },
            {
                path: routes.endorsementSuccess,
                Component: Success
            },
            {
                path: routes.dashboard,
                Component: Dashboard
            },
        ]
    },

])