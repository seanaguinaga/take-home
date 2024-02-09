export async function getLease(
  bookingId: string,
  userId: string,
  availableDate: string
) {
  console.log("getLease", bookingId, userId, availableDate);
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second delay
  if (Math.random() > 0.5) {
    return { id: "1" };
  }
}
