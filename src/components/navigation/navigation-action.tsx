"use client";
import { Plus } from "lucide-react";
import React from "react";
import { ActionTooltip } from "../action-tooltip";
import { useModal } from "../../../hooks/use-modal-store";

const NavigationAction = () => {

  const {onOpen} = useModal();

  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <div className="group flex items-center" onClick={()=>onOpen("createServer")}>
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background bg-slate-200 dark:bg-[#313338] group-hover:bg-emerald-500">
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </div>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
