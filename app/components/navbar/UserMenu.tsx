import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar";
import { useCallback, useState } from "react";
import { MenuItem } from "./MenuItem";
import { useRegister } from "@/app/hooks/useRegisterModal";
import { useLogin } from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { useRent } from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

interface UserMenuProps {
    currentUser?: User | null
}

export const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const loginModal = useLogin();
    const registerModal = useRegister();
    const rentModal = useRent();
    const router = useRouter();

    const toggleOpen = useCallback(() => {
        setIsOpen((currentisOpen) => !currentisOpen)
    }, [])

    const onRent = useCallback(() => {
        if (!currentUser) {
            return loginModal.onOpen();
        }

        rentModal.onOpen();

    }, [loginModal, currentUser, rentModal])

    return (
        <div className="relative ">
            <div className="flex flex-row items-center gap-3">
                <div
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                    onClick={onRent}
                >
                    Airbnb your home
                </div>
                <div
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-100 flex flex-row items-center gap-3 cursor-pointer transition hover:shadow-md"
                    onClick={toggleOpen}
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block ">
                        <Avatar src={currentUser?.image} />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-o top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser && (
                            <>
                                <MenuItem
                                    onClick={() => router.push('/trips')}
                                    label="My trips"
                                />
                                <MenuItem
                                    onClick={() => router.push('/favourites')}
                                    label="My favourites"
                                />
                                <MenuItem
                                    onClick={() => router.push('/reservations')}
                                    label="My reservations"
                                />
                                <MenuItem
                                    onClick={() => router.push('/properties')}
                                    label="My properties"
                                />
                                <MenuItem
                                    onClick={rentModal.onOpen}
                                    label="Airbnb my home"
                                />
                                <hr />
                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Logout"
                                />
                            </>
                        )}
                        {!currentUser && (
                            <>
                                <MenuItem
                                    onClick={loginModal.onOpen}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label="Sign up"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}