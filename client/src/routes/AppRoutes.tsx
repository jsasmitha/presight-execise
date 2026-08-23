import { Route, Routes } from "react-router";
import { UserDirectoryPage } from "../pages/UserDirectory";

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<UserDirectoryPage />} />
        </Routes>
    );
}