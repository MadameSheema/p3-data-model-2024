import { number, object, string } from "zod";
import { db } from "../prisma/db";
import yargs from 'yargs';
import { prismaCatchErrors, schemaCatchErrors } from "./error_handling";
import { roomAvailability } from "./get_room_availability";

/*
const createBooking = async (roomNumber: number, dogName:string, entryDate: string): Promise<void> => {
    
}*/

const optionsSchema = object({
    roomnumber: number(),
    dogname: string(),
    entrydate: string(),
});

const cli = async () => {
    const options = await yargs(process.argv.slice(2))
        .option('roomnumber', { type: 'number', description: 'Room number' })
        .option('dogname', { type: 'string', description: 'Name of the dog' })
        .option('entrydate', { type: 'string', description: 'Entry date of the dog in the hotel' })
        .usage('Creates a booking using the dog name and the entry date.')
        .help().version(false).argv;

    schemaCatchErrors(optionsSchema, options);

    const now = new Date().toISOString();
    const roomNumber = options.roomnumber as number;
    const dogName = options.dogname as string;
    const entryDate = options.entrydate as string;

    if (entryDate < now) {
        console.log('A booking cannot be performed in the past.')
        process.exit(1);
    }

    const roomId: { roomId: number }[] = await prismaCatchErrors(roomAvailability(roomNumber, entryDate));

    if (roomId.length > 0) {
        console.log(`The room ${roomNumber} is booked for the given date. The book cannot be performed`);
        process.exit(1);
    }

    //await prismaCatchErrors(createBooking(roomNumber, dogName, entryDate));
};

await cli();
