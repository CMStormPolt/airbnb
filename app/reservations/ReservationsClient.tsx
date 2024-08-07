'use client'

import { Container } from "@/app/components/Container";
import { Listing, Reservation, User } from "@prisma/client";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { Heading } from "../components/Heading";
import { ListingCard } from "../components/listings/ListingCard";

interface ReservationsClientProps {
    reservations?: (Reservation & {
        listing: Listing;
      })[];
    currentUser?: User | null;
}

export const ReservationsClient: React.FC<ReservationsClientProps> = ({reservations = [], currentUser}) => {
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
                title="Reservations"
                subTitle="Booking on your properties"
            />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-colds-6 gap-8">
                {reservations.map((reservation) => (
                    <ListingCard 
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    );
}
