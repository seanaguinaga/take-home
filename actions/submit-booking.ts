"use server";

import { redirect } from "next/navigation";

export async function submitBooking(bookingId: string, formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  console.log(values);

  // mutate data
  // revalidate cache

  await new Promise((resolve) => setTimeout(resolve, 3000));

  redirect(`/${bookingId}/book/confirmed`);
}
