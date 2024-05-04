import { db } from '../db'

export const findOwner = async (email: string): Promise<{ ownerId: number, email: string } | null> => {
    const owner = await db.owner.findUnique({
        select: {
            email: true,
            ownerId: true
        },
        where: {
            email
        }
    });

    return owner;
};

export const findRoom = async (roomNumber: number): Promise<{ roomId: number } | null> => {
    const room = await db.room.findUnique({
        select: {
            roomId: true
        },
        where: {
            roomNumber
        }
    });

    return room;
};

export const findBooking = async (dogName: string, entryDate: string): Promise<{ bookingId: number } | null> => {
    const booking = await db.booking.findFirst({
        select: {
            bookingId: true,
        },
        where: {
            entryDate,
            Dog: {
                name: {
                    equals: dogName,
                    mode: 'insensitive'
                }
            }
        }
    });

    return booking
};

export const findAllBreeds = async (): Promise<{ breed: string }[]> => {
    const breeds = await db.dog.findMany({
        select: {
            breed: true,
        },
        orderBy: {
            name: 'asc',
        },
        distinct: 'breed'
    });

    return breeds;
};

export const findAllDogs = async (): Promise<{ name: string }[]> => {
    const dogs = await db.dog.findMany({
        select: {
            name: true,
        },
        orderBy: {
            name: 'asc'
        },
    });

    return dogs;
};

export const findAllOwners = async (): Promise<{ fullName: string }[]> => {
    const owners = await db.owner.findMany({
        select: {
            fullName: true,
        },
        orderBy: {
            fullName: 'asc'
        },
    });

    return owners;
};

export const findBookedRooms = async (date: string): Promise<{ name: string, roomNumber: number }[]> => {
    const rooms = await db.room.findMany({
        select: {
            name: true,
            roomNumber: true
        },
        where: {
            bookings: {
                some: {
                    entryDate: {
                        lte: date
                    },
                    OR: [
                        {
                            exitDate: {
                                gte: date
                            }
                        },
                        {
                            exitDate: null
                        }
                    ]
                }
            }
        }
    });

    return rooms
};

export const findDogs = async (email: string): Promise<{ name: string, dogId: number }[]> => {
    const dogs = await db.dog.findMany({
        select: {
            name: true,
            dogId: true,
        },
        where: {
            owner: {
                email
            }
        },
    });

    return dogs;
};