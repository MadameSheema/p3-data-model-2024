import { db } from './db';

const createOwner = async (fullName: string, address: string) => {
    return await db.owner.create({
            data: {
                fullName,
                address
            }
        })
};

const createDog = async (name: string, breed: string, ownerId: number) => {
    return await db.dog.create({
            data: {
                name,
                breed,
                ownerId
            }
        })
};

const createRoom = async (name: string, roomNumber: number, size: number) => {
    return await db.room.create({
        data: {
            name,
            roomNumber,
            size
        }
    })
};

const createBooking = async (entryDate: string, exitDate: string, price: number, dogId: number, roomId: number) => {
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


const gloria = await createOwner('Gloria Hornero', 'Sant Pere de Ribes');
ownerLog(gloria.fullName, gloria.ownerId);
const ariadna = await createOwner('Ariadna F', 'Sant Pere de Ribes');
ownerLog(ariadna.fullName, ariadna.ownerId);

const xoco = await createDog('Xoco', 'Mix', gloria.ownerId);
dogLog(xoco.name, xoco.dogId);
const canino = await createDog('Canino', 'Tulear Cotton', ariadna.ownerId);
dogLog(canino.name, canino.dogId);
const avatar = await createDog('Avatar', 'Tulear Cotton', ariadna.ownerId);
dogLog(avatar.name, avatar.dogId);

const jungleRoom = await createRoom('The Jungle', 700, 50);
roomLog(jungleRoom.name, jungleRoom.roomId);
const gardenRoom = await createRoom('The Garden', 717, 30);
roomLog(gardenRoom.name, gardenRoom.roomId);
const dreamRoom = await createRoom('The Dream', 720, 60);
roomLog(dreamRoom.name, dreamRoom.roomId);

const caninoBooking = await createBooking('2024-04-28T08:00:00Z', '2024-05-03T17:00:00Z', 300, canino.dogId, dreamRoom.roomId);
bookingLog(caninoBooking.bookId);