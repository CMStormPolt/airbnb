import { prisma } from "../libs/prisma.db";

interface IParams {
    listingId?: string;
}

export async function getListingById(params: IParams) {
    const { listingId } = params;

    try {
        const listing = prisma.listing.findUnique(({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        }))

        if(!listing) {
            return null;
        }

        return listing;
    } catch(error: any){
        throw new Error(error);
    }
}