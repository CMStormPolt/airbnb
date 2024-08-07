import { NextResponse } from 'next/server';
import { prisma } from '@/app/libs/prisma.db';
import { getCurrentUser } from '@/app/actions/getCurrentUser';

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.error();
    }

    const body = await request.json();
    const { title, description, imageSrc, category, roomCount, guestCount, bathroomCount, location, price } = body


    const listing = await prisma.listing.create({
        data: {
           title,
           description,
           imageSrc,
           category,
           roomCount,
           bathRoomCount: bathroomCount,
           guestCount,
           locationValue: location.value,
           price: parseInt(price, 10),
           userId: currentUser.id

        }
    })

    return NextResponse.json(listing);
}