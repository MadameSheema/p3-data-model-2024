import { object, string, type ZodError } from "zod";
import { db } from "../prisma/db";
import yargs from 'yargs';
import { prismaCatchErrors, schemaCatchErrors } from "./error_handling";

const deleteBooking = async (dogName: string, entryDate: string): Promise<void> => {
    const booking = await db.booking.findFirst({
        select: {
             bookId: true,
        },
        where: {
            entryDate,
            Dog: {
                name: {
                    equals: dogName,
                    mode: 'insensitive' 
                }
            }
        },
    });
    
    if(booking){
        await db.booking.delete({
            where: {
                bookId: booking.bookId,
            }
        })
        console.log(`${dogName} booking has been deleted.`)
    } else {
        console.log('Booking not found.');
    }
};

const optionsSchema = object({
    dogname: string(),
    entrydate: string(),
});

const cli = async () => {
    const options = await yargs(process.argv.slice(2)).option('dogname', { type: 'string', description: 'Name of the dog' })
    .option('entrydate', { type: 'string', description: 'Entry date of the dog in the hotel' })
    .usage('Deletes a booking using the dog name and the entry date.')
    .help().version(false).argv;

    schemaCatchErrors(optionsSchema, options);
    
    const dogName = options.dogname as string;
    const entryDate = options.entryDate as string;
    await prismaCatchErrors(deleteBooking(dogName, entryDate));
};

await cli();
