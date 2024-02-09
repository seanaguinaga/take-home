"use server";

export async function submitBooking(formData: FormData) {
  const values = Object.fromEntries(formData.entries());

  console.log(values);

  // mutate data
  // revalidate cache
}
