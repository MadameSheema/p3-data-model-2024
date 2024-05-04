import { prismaCatchErrors } from '../src/error_handling';
import { createOwner, createDog, createRoom, createBooking } from './queries/create';

const ownerLog = (fullName: string, ownerId: number) => console.log(`Created owner with full name: ${fullName} and id: ${ownerId}`);
const dogLog = (name: string, dogId: number) => console.log(`Created dog with name: ${name} and id: ${dogId}`);
const roomLog = (name: string, roomId: number) => console.log(`Created room with name: ${name} and id: ${roomId}`);
const bookingLog = (bookingId: number) => console.log(`Created booking with id: ${bookingId}`);

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

const caninoBooking = await prismaCatchErrors(createBooking(canino.dogId, dreamRoom.roomId, '2024-04-28T08:00:00Z', '2024-05-03T17:00:00Z', 300));
if (caninoBooking) bookingLog(caninoBooking.bookingId);
const avatarBooking = await prismaCatchErrors(createBooking(avatar.dogId, jungleRoom.roomId, '2024-04-28T08:00:00Z'));
if (avatarBooking) bookingLog(avatarBooking.bookingId);