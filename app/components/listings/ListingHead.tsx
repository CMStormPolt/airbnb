'use client';

import { useCountries } from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import { Heading } from "../Heading";
import Image from "next/image";
import { HeartButton } from "../HeartButton";

interface ListingHeadProps {
    title: string;
    locationValue: string;
    id: string;
    currentUser?: User | null;
    imageSrc: string;
}

export const ListingHead: React.FC<ListingHeadProps> = ({
    id,
    title,
    locationValue,
    currentUser,
    imageSrc
}) => {
    const { getByValue } = useCountries();

    const location = getByValue(locationValue);

    return (
        <>
            <Heading 
                title={title}
                subTitle={`${location?.region}, ${location?.label}`}
            />
            <div className="w-full h-[60vh] overflow-hidden rounded-xl relative">
                <Image 
                    alt="listing pic"
                    src={imageSrc}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-5 right-5">
                    <HeartButton 
                        listingId={id}
                        currentUser={currentUser}
                    />
                </div>
            </div>
        </>
         
    )
}