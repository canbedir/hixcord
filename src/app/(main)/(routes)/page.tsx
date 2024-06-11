import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <UserButton afterSignOutUrl="/"/>
      <ModeToggle/>
    </>
  );
}
