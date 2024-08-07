import { prisma } from "../libs/prisma.db";
import { getCurrentUser } from "./getCurrentUser";

export async function getFavouritedListings() {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return [];
    }

    try {
        const favourited = await  prisma.listing.findMany(({
            where: {
                id: {
                    in: [...currentUser.favouriteIds]
                }
            },
        }))

        return favourited;
    } catch (error: any) {
        throw new Error(error);
    }
}