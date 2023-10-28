"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const useRouterPush = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const routerPushChange = (event) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    const value = event.trim();
    if (!value) current.delete("selected");
    else current.set("selected", event);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  return {
    routerPushChange,
  };
};
