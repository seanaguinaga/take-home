import { Listing } from "@/features/listings/listing/listing";
import { Page } from "@/ui/page";

export default function ListingPage() {
  return (
    <Page previous="/">
      <Listing />
    </Page>
  );
}
