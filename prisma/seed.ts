import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { db } from './db';
import { type Booking, type Dog, type Owner, type Room } from "@prisma/client";

const createOwner = async (fullName: string, email:string, address: string): Promise<Owner> => {
    console.log(`Creating owner with fullName: ${fullName}`);

    return await db.owner.create({
            data: {
                fullName,
                email,
                address
            }
        })
};

const createDog = async (name: string, breed: string, ownerId: number): Promise<Dog> => {
    console.log(`Creating dog with name: ${name}`);

    return await db.dog.create({
            data: {
                name,
                breed,
                ownerId
            }
        })
};

const createRoom = async (name: string, roomNumber: number, size: number): Promise<Room> => {
    console.log(`Creating room with name: ${name}`);

    return await db.room.create({
        data: {
            name,
            roomNumber,
            size
        }
    })
};

const createBooking = async (entryDate: string, exitDate: string, price: number, dogId: number, roomId: number): Promise<Booking> => {
    console.log(`Creating booking for the dogId: ${dogId}`);

    return await db.booking.create({
        data: {
            entryDate,
            exitDate,
            price,
            dogId,
            roomId,
        }
    })
};

const ownerLog = (fullName: string, ownerId: number) => console.log(`Created owner with full name: ${fullName} and id: ${ownerId}`);
const dogLog = (name: string, dogId: number) => console.log(`Created dog with name: ${name} and id: ${dogId}`);
const roomLog = (name: string, roomId: number) => console.log(`Created room with name: ${name} and id: ${roomId}`);
const bookingLog = (bookingId: number) => console.log(`Created boowking with id: ${bookingId}`);


const prismaCatchErrors = async (myMethod: any) => {
    try {
        return await myMethod
    } catch (e) {
        const prismaError = e as PrismaClientValidationError;
        console.log(prismaError.message);
        process.exit(1);
    }
}

const gloria = await prismaCatchErrors(createOwner('Gloria Hornero', 'gloria@test.com', 'Sant Pere de Ribes'));
if (gloria)  ownerLog(gloria.fullName, gloria.ownerId);
const ariadna = await prismaCatchErrors(createOwner('Ariadna F', 'ariadna@test.com', 'Sant Pere de Ribes'));
if (ariadna) ownerLog(ariadna.fullName, ariadna.ownerId);

const xoco = await prismaCatchErrors(createDog('Xoco', 'Mix', gloria.ownerId));
if (xoco) dogLog(xoco.name, xoco.dogId);
const canino = await prismaCatchErrors(createDog('Canino', 'Tulear Cotton', ariadna.ownerId));
if (canino) dogLog(canino.name, canino.dogId);
const avatar = await prismaCatchErrors(createDog('Avatar', 'Tulear Cotton', ariadna.ownerId));
if (avatar) dogLog(avatar.name, avatar.dogId);

const jungleRoom = await prismaCatchErrors(createRoom('The Jungle', 700, 50));
if (jungleRoom) roomLog(jungleRoom.name, jungleRoom.roomId);
const gardenRoom = await prismaCatchErrors(createRoom('The Garden', 717, 30));
if (gardenRoom) roomLog(gardenRoom.name, gardenRoom.roomId);
const dreamRoom = await prismaCatchErrors(createRoom('The Dream', 720, 60));
if(dreamRoom) roomLog(dreamRoom.name, dreamRoom.roomId);

const caninoBooking = await prismaCatchErrors(createBooking('2024-04-28T08:00:00Z', '2024-05-03T17:00:00Z', 300, canino.dogId, dreamRoom.roomId));
if (caninoBooking) bookingLog(caninoBooking.bookId);