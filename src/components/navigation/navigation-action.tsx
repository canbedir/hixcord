"use client";
import { Plus } from "lucide-react";
import React from "react";
import { ActionTooltip } from "../action-tooltip";

const NavigationAction = () => {
  return (
    <div>
      <ActionTooltip side="right" align="center" label="Add a server">
        <div className="group flex items-center">
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-[#313338] group-hover:bg-emerald-500">
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
