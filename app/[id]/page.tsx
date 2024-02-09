import { redirect } from "next/navigation";

import { getListing } from "@/features/listings/data";
import { Listing } from "@/features/listings/listing/listing";
import { Page } from "@/ui/page";

export default async function ListingPage({
  params: { id },
}: {
  params: {
    id: string;
  };
}) {
  const listing = await getListing(Number(id));

  if (!listing) {
    return redirect("/");
  }

  return (
    <Page previous="/">
      <Listing listing={listing} />
    </Page>
  );
}
