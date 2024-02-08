import { Book } from "@/features/listings/book/book";
import { Page } from "@/ui/page";

export default function BookPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <Page previous={`/${params.id}`}>
      <Book />
    </Page>
  );
}
