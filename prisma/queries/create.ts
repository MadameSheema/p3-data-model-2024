import type { Booking } from '@prisma/client';
import { db } from '../db'

export const createDog = async (name: string, breed: string, ownerId: number): Promise<void> => {
    await db.dog.create({
        data: {
            name,
            breed,
            ownerId
        }
    });
};

export const createBooking = async (dogId: number, roomId: number, entryDate: string, exitDate?: string, price?: number,): Promise<Booking> => {
    console.log(`Creating booking for the dogId: ${dogId}`);

    return await db.booking.create({
        data: {
            dogId,
            roomId,
            entryDate,
            exitDate,
            price
        }
    })
};