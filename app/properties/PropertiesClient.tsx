'use client'

import { Container } from "@/app/components/Container";
import { Listing, Reservation, User } from "@prisma/client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { Heading } from "../components/Heading";
import { ListingCard } from "../components/listings/ListingCard";
import { list } from "postcss";

interface PropertiesClientProps {
    listings: Listing[];
    currentUser?: User | null;
}

export const PropertiesClient: React.FC<PropertiesClientProps> = ({listings = [], currentUser}) => {
    const [deletingId, setDeletingId] = useState('');
    const router = useRouter();

    const onCancel = useCallback(async (id: string) => {
        setDeletingId(id);

        try {
            await axios.delete(`/api/listings/${id}`)
            toast.success('Listings removed')
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
                title="Properties"
                subTitle="List of your properties"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-colds-6 gap-8">
                {listings.map((listings) => (
                    <ListingCard 
                        key={listings.id}
                        data={listings}
                        actionId={listings.id}
                        onAction={onCancel}
                        disabled={deletingId === listings.id}
                        actionLabel="Remove property"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}
