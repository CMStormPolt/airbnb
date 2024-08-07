import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { EmptyState } from "@/app/components/EmptyState";
import { getReservations } from "@/app/actions/getReservations";
import { ReservationsClient } from "./ReservationsClient";

interface IParams {
    listingId?: string;
}

export default async function ReservationsPage({params} : {params: IParams}) {
    const { listingId } = params;
    const currentUser = await getCurrentUser();
    
    if(!currentUser) {
      return <EmptyState title="Unauthorized" subTitle="Please log in"/>
    }

    const reservations = await getReservations({authorId: currentUser!.id});

    if(!reservations.length) {
        return <EmptyState title="No reservations found" subTitle="Looks like you have not reservations on your property"/>
    }

  return (
    <ReservationsClient
      reservations={reservations}
      currentUser={currentUser}
    >

    </ReservationsClient>
  );
}
