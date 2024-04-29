import { db } from "../prisma/db";
import yargs from 'yargs';

const getDogsByOwner = async (name: string) => {
    const dogs = await db.dog.findMany({
        where: {
            owner: {
                fullName: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
        }
    });
    
    for(const dog of dogs) {
        console.log(dog.name);
    };
};

const cli = async () => {
    const options = await yargs(process.argv.slice(2)).option('name', { type: 'string' }).argv;
    const name = options.name as string;

    if(!name) {
        console.log('The name of the owner is missing, please use --name <ownerName>');
    } else {
        await getDogsByOwner(name);
    }
};

await cli();
