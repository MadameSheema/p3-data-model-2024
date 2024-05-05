import type { Booking, Dog, Owner, Room } from '@prisma/client';
import { db } from '../db'

export const createOwner = async (fullName: string, email:string, address: string): Promise<Owner> => {
    return await db.owner.create({
            data: {
                fullName,
                email,
                address
            }
        });
};

export const createDog = async (name: string, breed: string, ownerId: number): Promise<Dog> => {
    return await db.dog.create({
            data: {
                name,
                breed,
                ownerId
            }
        });
};

export const createRoom = async (name: string, roomNumber: number, size: number): Promise<Room> => {
    return await db.room.create({
        data: {
            name,
            roomNumber,
            size
        }
    });
};

export const createBooking = async (dogId: number, roomId: number, entryDate: string, exitDate?: string, price?: number, ): Promise<Booking> => {
    return await db.booking.create({
        data: {
            dogId,
            roomId,
            entryDate,
            exitDate,
            price
        }
    });
};
