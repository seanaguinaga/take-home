"use server";

export async function signLease(formData: FormData) {
  if (!formData.get("signature")) return;

  await new Promise((resolve) => setTimeout(resolve, 3000));

  return { id: "1" };
}
