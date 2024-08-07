import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { User } from "@prisma/client";
import { useLogin } from "./useLoginModal";


interface IUseFavourite {
    listingId: string;
    currentUser?: User | null;
}



export const useFavourite = ({ listingId, currentUser } : IUseFavourite) => {
    const router = useRouter();
    const loginModal = useLogin();

    const hasFavourited = useMemo(() => {
        const list = currentUser?.favouriteIds || [];

        return list.includes(listingId);
    },[currentUser, listingId])

    const toggleFavourite = useCallback(async (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();

        if(!currentUser){
            return loginModal.onOpen();
        }

        try {
            let request;

            if(hasFavourited) {
                request = () => axios.delete(`/api/favourites/${listingId}`)
            } else {
                request = () => axios.post(`/api/favourites/${listingId}`)
            }

            await request();
            router.refresh();
            toast.success('Success');
        } catch(error) {
            toast.error('Something went wrong');
        }
    }, [currentUser, hasFavourited, listingId, loginModal, router])


    return {
        hasFavourited,
        toggleFavourite
    }
}