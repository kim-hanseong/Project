"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";

import MoveTopIcons from "../전역/MoveTopIcons";

import { AuthProvider } from "./User";
import PublicModal from "./PublicModal";
import NavBar from "./NavBar";

const queryClient = new QueryClient();
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <RecoilRoot>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <MoveTopIcons />
          <NavBar />
          {children}
          <PublicModal />
        </QueryClientProvider>
      </AuthProvider>
    </RecoilRoot>
  );
};

export default Layout;
