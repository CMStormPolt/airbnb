import { prisma } from "../libs/prisma.db";

export interface IListingParams {
    userId?: string;
    guestCount?: number;
    roomCount?: number;
    bathRoomCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}


export async function getListings(params: IListingParams) {
    const { userId, guestCount, roomCount, bathRoomCount, startDate, endDate, locationValue, category } = params;

    let query: any = {};

    if (userId) {
        query.userId = userId
    }

    if (category) {
        query.category = category
    }

    if (guestCount) {
        query.guestCount = {
            gte: +guestCount
        }
    }

    if (roomCount) {
        query.roomCount = {
            gte: +roomCount
        }
    }

    if (bathRoomCount) {
        query.bathRoomCount = {
            gte: +bathRoomCount
        }
    }

    if (locationValue) {
        query.locationValue = locationValue
    }

    if (startDate && endDate) {
        query.NOT = {
            reservations: {
                some: {
                    OR: [
                        {
                            endDate: { gte: startDate },
                            startDate: { lte: startDate },
                        },
                        {
                            startDate: { lte: endDate },
                            endDate: { gte: endDate },
                        },
                    ],
                }
            }
        }
    }

    try {
        const listings = prisma.listing.findMany(({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        }))

        return listings;
    } catch (error: any) {
        throw new Error(error);
    }
}