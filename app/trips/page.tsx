import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { getListingById } from "@/app/actions/getListingById";
import { EmptyState } from "@/app/components/EmptyState";
import { getReservations } from "@/app/actions/getReservations";
import { TripsClient } from "./TripsClient";

interface IParams {
    listingId?: string;
}

export default async function TripsPage({params} : {params: IParams}) {
  const currentUser = await getCurrentUser();
  
  if(!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please log in"/>
  }
  
  const reservations = await getReservations({userId: currentUser!.id});

  if(!reservations.length) {
    return <EmptyState title="No trips found" subTitle="Looks like you haven't reserved any trips"/>
  }


  return (
    <TripsClient 
      reservations={reservations}
      currentUser={currentUser}
    />
  );
}
