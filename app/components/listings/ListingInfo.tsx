'use client';

import { useCountries } from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import { IconType } from "react-icons";
import { Avatar } from "../Avatar";
import { ListingCategory } from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import('../Map'), {
    ssr: false
});

interface ListingInfoProps {
    description: string;
    guestCount: number;
    roomCount: number;
    bathRoomCount: number;
    category: {
        icon: IconType,
        label: string;
        description: string;
    } | undefined;
    locationValue: string;   
    user: User;
}

export const ListingInfo: React.FC<ListingInfoProps> = ({
    description,
    guestCount,
    roomCount,
    bathRoomCount,
    category,
    locationValue,
    user,

}) => {
    const { getByValue } = useCountries();

    const cordinates = getByValue(locationValue)?.latlng;



    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>
                        Hosted by {user.name}
                    </div>
                    <Avatar 
                        src={user.image}
                    />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div>
                        {guestCount} guests
                    </div>
                    <div>
                        {roomCount} rooms
                    </div>
                    <div>
                        {bathRoomCount} bathrooms
                    </div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory 
                    icon={category.icon}
                    label={category.label}
                    description={category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            <Map center={cordinates}/>
        </div>         
    )
}