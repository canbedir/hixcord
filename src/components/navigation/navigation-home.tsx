"use client";
import { Plus } from "lucide-react";
import React from "react";
import { ActionTooltip } from "../action-tooltip";
import { useModal } from "../../../hooks/use-modal-store";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Icons } from "../icon";
import { useParams, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const NavigationHome = () => {
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  return (
    <div className="group relative flex items-center">
      <ActionTooltip side="right" align="center" label="Add a server">
        <div
          className="group flex items-center"
          onClick={() => router.push("/")}
        >
          <div
            className={cn(
              "absolute left-0 bg-primary rounded-r-full transition-all w-[4px]",
              !params?.serverId && "group-hover:h-[20px]",
              !params?.serverId ? "h-[36px]" : "h-[0px]"
            )}
          />
          <Link
            href={"/"}
            className={cn(
              "flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background bg-slate-200 dark:bg-[#313338] group-hover:bg-indigo-500",
              !params?.serverId && "bg-primary/10 text-primary rounded-[16px]"
            )}
          >
            <Icons.logo className="h-8 w-8" />
          </Link>
        </div>
      </ActionTooltip>
    </div>
  );
};

export default NavigationHome;
