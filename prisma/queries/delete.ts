import { db } from '../db'

export const deleteBooking = async (bookingId: number): Promise<void> => {
    await db.booking.delete({
        where: {
            bookingId
        }
    });
};