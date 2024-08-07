'use client'

import { Container } from "@/app/components/Container";
import { Listing, Reservation, User } from "@prisma/client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { Heading } from "../components/Heading";
import { ListingCard } from "../components/listings/ListingCard";

interface FavouritesClientProps {
    listings: Listing[];
    currentUser?: User | null;
}

export const FavouritesClient: React.FC<FavouritesClientProps> = ({listings = [], currentUser}) => {
    const [deletingId, setDeletingId] = useState('');
    const router = useRouter();

    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id);

        try {
            await axios.delete(`/api/reservations/${id}`)
            toast.success('Reservation cancelled')
            router.refresh()
        } catch(error: any) {
            toast.error(error?.response?.data?.error)
        } finally {
            setDeletingId('');
        }
    }, [router])

    return (
        <Container>
            <Heading 
                title="Favourites"
                subTitle="List of places you have favourited"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-colds-6 gap-8">
                {listings.map((listings) => (
                    <ListingCard 
                        key={listings.id}
                        data={listings}
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}
