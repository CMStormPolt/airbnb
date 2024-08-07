import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { EmptyState } from "@/app/components/EmptyState";
import { PropertiesClient } from "./PropertiesClient";
import { getListings } from "../actions/getListings";

interface IParams {
    listingId?: string;
}

export default async function PropertiesPage({params} : {params: IParams}) {
  const currentUser = await getCurrentUser();
  
  if(!currentUser) {
    return <EmptyState title="Unauthorized" subTitle="Please log in"/>
  }
  
  const listings = await getListings({userId: currentUser!.id});

  if(!listings.length) {
    return <EmptyState title="No properties found" subTitle="Looks like you have not properties"/>
  }


  return (
    <PropertiesClient 
      listings={listings}
      currentUser={currentUser}
    />
  );
}
