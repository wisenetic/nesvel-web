import { SidebarFooter as ShadcnSidebarFooter } from "@/core/components/ui/sidebar";
import { UserMenu } from "./user-menu";

export const SidebarFooter = () => {
  return (
    <ShadcnSidebarFooter>
      <UserMenu
        user={{
          name: "shadcn",
          email: "m@example.com",
          avatar: "/avatars/shadcn.jpg",
        }}
      />
    </ShadcnSidebarFooter>
  );
};
