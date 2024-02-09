import { redirect } from "next/navigation";

import { Book } from "@/features/listings/book/book";
import { getListing } from "@/features/listings/data";
import { Page } from "@/ui/page";

export default async function BookPage({
  params,
  searchParams,
}: {
  params: {
    id: string;
  };
  searchParams: {
    start: string | undefined;
    end: string | undefined;
  };
}) {
  const listing = await getListing(
    Number(params.id),
    searchParams.start,
    searchParams.end
  );

  if (!listing) return redirect("/");

  return (
    <Page previous={`/${params.id}`}>
      <Book listing={listing} />
    </Page>
  );
}
