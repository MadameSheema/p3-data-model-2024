import { number, object, string } from "zod";
import { db } from "../prisma/db";
import yargs from 'yargs';
import { prismaCatchErrors, schemaCatchErrors } from "./error_handling";

export const roomAvailability = async (roomNumber: number, entryDate: string):Promise<{roomId: number}[]> => {
    const booking = await db.booking.findMany({
        select: {
            roomId: true
        },
        where: {
            Room: {
                roomNumber
            },
            AND: {
                entryDate: {
                    lte: entryDate
                },
                exitDate: {
                    gte: entryDate
                },
            }
        }
    });

    return booking;

}

const optionsSchema = object({
    'room-number': number(),
    'entry-date': string(),
});

const cli = async () => {
    
    const options = await yargs(process.argv.slice(2))
    .option('room-number', { type: 'number', description: 'Room number'})
    .option('entry-date', { type: 'string', description: 'Entry date to hotel' })
    .usage('Checks if a room is available for a given entry date.')
    .help().version(false).argv;
    
    schemaCatchErrors(optionsSchema, options);

    const roomNumber = options['room-number'] as number;
    const entryDate = options['entry-date'] as string;

    const roomId: {roomId: number}[] = await prismaCatchErrors(roomAvailability(roomNumber, entryDate));

    if(roomId.length > 0) {
        console.log(`The room ${roomNumber} is booked for the given date.`);
    } else {
        console.log(`The room ${roomNumber} is free for the given date.`)
    }
};

await cli();
