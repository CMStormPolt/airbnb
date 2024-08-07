import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import { EmptyState } from "@/app/components/EmptyState";
import { ListingClient } from "./ListingClient";
import { getReservations } from "@/app/actions/getReservations";

interface IParams {
    listingId?: string;
}

export default async function ListingPage({params} : {params: IParams}) {
    const { listingId } = params;
    const listing = await getListingById({listingId});
    const reservations = await getReservations({listingId});
    const currentUser = await getCurrentUser();

    if(!listing) {
        return <EmptyState />
    }

  return (
    <ListingClient 
        currentUser={currentUser}
        listing={listing!}
        reservations={reservations}
    />
  );
}
