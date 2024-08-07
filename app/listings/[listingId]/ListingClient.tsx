'use client'

import { Container } from "@/app/components/Container";
import { categories } from "@/app/components/navbar/Categories";
import { Listing, Reservation, User } from "@prisma/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ListingHead } from "@/app/components/listings/ListingHead";
import { ListingInfo } from "@/app/components/listings/ListingInfo";
import { useLogin } from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import axios from "axios";
import toast from "react-hot-toast";
import { ListingReservation } from "@/app/components/listings/ListingReservation";
import { Range } from "react-date-range";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date,
    key: 'selection'
}

interface ListingClientProps {
    reservations?: Reservation[];
    listing: Listing & { user: User };
    currentUser?: User | null;
}

export const ListingClient: React.FC<ListingClientProps> = ({reservations = [], listing, currentUser}) => {
    const [isLoading, setIsloading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    const loginModal = useLogin();
    const router = useRouter();

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            })
            dates = [...dates, ...range]
        })

        return dates;

    }, [reservations])


    const category = useMemo(()=> {
        return categories.find((item) => {
            return item.label === listing.category
        })
    }, [listing.category])

    const onCreateReservation = useCallback(async () => {
        if(!currentUser){
            loginModal.onOpen();
        }

        setIsloading(true);
        try {
            await axios.post('/api/reservations', {
                totalPrice,
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                listingId: listing.id
            })
            toast.success('Listing reserved')
            setDateRange(initialDateRange)
            router.refresh();
            router.push('/trips');

        } catch(error){
            toast.error('Something went wrong');
        } finally {
            setIsloading(false);
        }
    }, [totalPrice, router, loginModal, currentUser, listing.id, dateRange.startDate, dateRange.endDate])

    useEffect(() => {
        if(dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate);

            if(dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price)
            } else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange.startDate, dateRange.endDate, listing.price])

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead 
                        id={listing.id}
                        title={listing.title}
                        locationValue={listing.locationValue}
                        imageSrc={listing.imageSrc}
                        currentUser={currentUser}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
                        <ListingInfo 
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathRoomCount={listing.bathRoomCount}
                            locationValue={listing.locationValue}
                        />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation 
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChange={(value) => {setDateRange(value)}}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}
