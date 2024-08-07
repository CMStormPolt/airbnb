import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import { EmptyState } from "@/app/components/EmptyState";
import { getReservations } from "@/app/actions/getReservations";
import { getFavouritedListings } from "../actions/getFavouritedListings";
import { FavouritesClient } from "./FavouritesClient";

export default async function FavouritesPage() {
    const currentUser = await getCurrentUser();
    
    if(!currentUser) {
      return <EmptyState title="Unauthorized" subTitle="Please log in"/>
    }
    
    const favouritedListings = await getFavouritedListings();

    if(!favouritedListings) {
        return <EmptyState title="No favourites found" subTitle="Looks like you have no favourited listings"/>
    }

  return (
    <FavouritesClient listings={favouritedListings} currentUser={currentUser} />
  );
}
