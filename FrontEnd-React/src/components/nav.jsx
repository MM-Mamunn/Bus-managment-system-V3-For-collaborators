import React from "react";
import { Link } from "react-router-dom";
import { FaBus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaCircleQuestion } from "react-icons/fa6";
import { CiUser, CiLogout } from "react-icons/ci";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGlobalContext } from "@/context";

export default function Header() {
  const { userInfo } = useGlobalContext();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 bg-gray-100">
      <Link to="/" className="flex items-center space-x-2">
        <FaBus className="text-base sm:text-lg md:text-xl" />
        <span className="text-base sm:text-lg md:text-xl font-bold">
          Bus Management System
        </span>
      </Link>

      <div>
        {userInfo === "" ? (
          <Link to="/auth">
            <Button className="text-sm sm:text-base md:text-lg px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4">
              Login
            </Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="https://github.com/shadcnd.png" />
                <AvatarFallback>
                  <FaCircleQuestion className="w-10 h-10" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <CiUser className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <CiLogout className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
