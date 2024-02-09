"use server";

import { redirect } from "next/navigation";

export async function submitBooking(bookingId: string, formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  console.log(values);

  // check to see if the booking can be made

  await new Promise((resolve) => setTimeout(resolve, 3000));

  redirect(`/${bookingId}/book/confirmed`);
}
