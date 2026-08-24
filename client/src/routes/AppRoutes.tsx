import { Route, Routes } from "react-router";

import { UserDirectoryPage } from "@pages/UserDirectory";

// Function to define the application routes, including the User Directory page route
export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserDirectoryPage />} />
    </Routes>
  );
}
