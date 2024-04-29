import { db } from "../prisma/db";
import yargs from 'yargs';

const getOwnerBydog = async (name: string) => {
    const owner = await db.owner.findFirst({
        where: {
            dogs: {
                some: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                }
            }
            }
        }
    });
    
    console.log(owner?.fullName);
};

const cli = async () => {
    const options = await yargs(process.argv.slice(2)).option('name', { type: 'string' }).argv;
    const name = options.name as string;

    if(!name) {
        console.log('The name of the dog is missing, please use --name <dogName>');
    } else {
        await getOwnerBydog(name);
    }
};

await cli();
