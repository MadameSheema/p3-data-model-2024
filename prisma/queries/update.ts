import { db } from '../db'

export const updateOwnerEmail = async (email: string, newEmail: string) => {
    await db.owner.update({
        where: {
            email
        },
        data: {
            email: newEmail
        }
    });
};