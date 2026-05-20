import { Route, Routes } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { Dashboard } from "@/pages/Dashboard";
import { Analytics } from "@/pages/Analytics";
import { Applications } from "@/pages/Applications";
import { ApplicationDetail } from "@/pages/ApplicationDetail";
import { Users } from "@/pages/Users";
import { UserStatuses } from "@/pages/UserStatuses";
import { Roles } from "@/pages/Roles";
import { Clients } from "@/pages/Clients";
import { Partners } from "@/pages/Partners";
import { Branches } from "@/pages/Branches";
import { TelegramBot } from "@/pages/TelegramBot";
import { NotFound } from "@/pages/NotFound";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="applications" element={<Applications />} />
        <Route path="applications/:id" element={<ApplicationDetail />} />
        <Route path="users" element={<Users />} />
        <Route path="user-statuses" element={<UserStatuses />} />
        <Route path="roles" element={<Roles />} />
        <Route path="clients" element={<Clients />} />
        <Route path="partners" element={<Partners />} />
        <Route path="branches" element={<Branches />} />
        <Route path="telegram" element={<TelegramBot />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
