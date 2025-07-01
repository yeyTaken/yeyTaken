"use client";

import { Link } from "@heroui/link";
import { FaInstagram, FaGithub } from "react-icons/fa6";

export default function SocialMediaBar() {
  return (
    <div className="select-none fixed z-[99999999] bottom-4 left-4 flex flex-col items-center gap-4">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex items-center">
          <div className="group">
            <Link href="https://instagram.com/rabikkj" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-foreground hover:text-pink-500 dark:hover:text-pink-400 w-6 h-6 transition-colors" />
            </Link>
            <span className="absolute ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-foreground">
              /rabikkj
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <div className="group">
            <Link href="https://github.com/yeyTaken" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-foreground hover:text-gray-500 dark:hover:text-gray-400 w-6 h-6 transition-colors" />
            </Link>
            <span className="absolute ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm text-foreground">
              /yeyTaken
            </span>
          </div>
        </div>

      </div>

      <div className="w-[2px] h-16 bg-gray-600 dark:bg-gray-500 mx-auto mt-2" />
    </div>
  );
}
