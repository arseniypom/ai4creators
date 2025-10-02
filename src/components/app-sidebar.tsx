"use client";

import { Target, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {useTranslations} from 'next-intl';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { LanguageSwitcher } from "@/components/language-switcher";

export function AppSidebar() {
  const pathname = usePathname();
  const t = useTranslations('Sidebar');

  const menuItems = [
    {
      title: t('generate'),
      icon: Sparkles,
      href: "/",
    },
    {
      title: t('strategy'),
      icon: Target,
      href: "/strategy",
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-semibold">
            {t('appName')}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <LanguageSwitcher />
      </SidebarFooter>
    </Sidebar>
  );
}
