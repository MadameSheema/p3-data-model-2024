import { date, number, object, string } from "zod";
import yargs from 'yargs';
import { prismaCatchErrors, schemaCatchErrors } from "./error_handling";
import { findBookedRooms, findDogs, findOwner, findRoom } from "../prisma/queries/find";
import { createBooking } from "../prisma/queries/create";

const optionsSchema = object({
    'room-number': number(),
    'dog-name': string(),
    'entry-date': string(),
    email: string()
});

const exitDateSchema = object({
    'exit-date': string() 
});

const priceSchema = object({
    price: string() 
});

const cli = async () => {
    const options = await yargs(process.argv.slice(2))
        .option('room-number', { type: 'number', description: 'Room number' })
        .demandOption('room-number', 'Required')
        .option('email', { type: 'string', description: 'Owner email' })
        .demandOption('email', 'Required')
        .option('dog-name', { type: 'string', description: 'Name of the dog' })
        .demandOption('dog-name', 'Required')
        .option('entry-date', { type: 'string', description: 'Entry date of the dog in the hotel' })
        .demandOption('entry-date', 'Required')
        .option('exit-date', { type: 'string', description: 'Exit date of the dog in the hotel' })
        .option('price', { type: 'number', description: 'Price of the booking' })
        .usage('Creates a booking using at least the dog name, owner, email and the entry date.')
        .help().version(false).argv;


    schemaCatchErrors(optionsSchema, options);
    if ('exit-date' in options) schemaCatchErrors(exitDateSchema, options);
    if ('price' in options) schemaCatchErrors(priceSchema, options);

    const now = new Date().toISOString();
    const roomNumber = options['room-number'] as number;
    const email = options.email as string;
    const dogName = options['dog-name'] as string;
    const entryDate = options['entry-date'] as string;
    const exitDate = options['exit-date'] as string;
    const price = options.price as number;



    if (entryDate < now) {
        console.log('A booking cannot be performed in the past.')
        process.exit(1);
    }

    const dogs = await findDogs(email);
    if (dogs.length === 0) {
        const owner = await findOwner(email);
        if (owner) {
            console.log(`Owner with email ${email} does not have any dog related.`);
            process.exit(1);
        } else {
            console.log(`Owner with email ${email} does not exist in the database.`);
            process.exit(1);
        }
    }

    const rooms: { name: string; roomNumber: number }[] = await prismaCatchErrors(findBookedRooms(entryDate));
    const foundRoom = rooms.find(room => room.roomNumber === roomNumber);

    if (foundRoom) {
        console.log(`The room ${roomNumber} is booked for the given date. The book cannot be performed`);
        process.exit(1);
    } else {
        const room = await findRoom(roomNumber);
        if (room) {
            const foundDog = dogs.find(dog => dog.name === dogName);

            if (foundDog) {
                await prismaCatchErrors(createBooking(foundDog.dogId, room.roomId, entryDate, exitDate, price))
                console.log(`Room ${roomNumber} booked for ${dogName}`);
            } else {
                console.log(`The owner with ${email} does not have the dog: ${dogName}`);
                process.exit(1);
            }
        } else {
            console.log(`The room ${roomNumber} does not exist`);
            process.exit(1);
        }
    }
};

await cli();
