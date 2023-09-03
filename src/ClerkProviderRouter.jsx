import {
    ClerkProvider, SignIn, SignUp,
} from "@clerk/clerk-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./page/Home";
import EventDetails from "./page/event/EventDetails";
import CategoryPage from "./page/event/category";
// import ProtectedRoutes from "./components/shared/ProtectedRoutes";
import EventForm from "./page/EventForm";
import AuthContainer from "./components/auth/SignIn";
import ProtectedRoutes from "./components/shared/ProtectedRoutes";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const ClerkProviderRouter = () => {
    const navigate = useNavigate();
    return (
        <ClerkProvider
            publishableKey={clerkPubKey}
            navigate={to => navigate(to)}
        >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/sign-in/*"
                    element={<AuthContainer><SignIn routing="path" path="/sign-in" /></AuthContainer>}
                />
                <Route
                    path="/sign-up/*"
                    element={<AuthContainer><SignUp routing="path" path="/sign-up" /></AuthContainer>}
                />
                {/* TODO: add protected routes ro /event-form route later on */}
                <Route path="/event-form" element={<ProtectedRoutes><EventForm /></ProtectedRoutes>} />
                <Route path="/event/:eventId" element={<EventDetails />} />
                <Route path="/event/category/:eventCategory" element={<CategoryPage />} />
            </Routes>
        </ClerkProvider>
    );
}
export default ClerkProviderRouter