# Index

* [Data model](#data-model)
* [Configuration](#configuration)
* [Database seeding](#database-seeding)
* [Visualizing the database](#visualizing-the-database)
* [Crud operations](#crud-operations)
  * [Retrieve all dogs names](#retrieve-all-dogs-names)
  * [Retrieve all dogs breeds](#retrieve-all-dogs-breeds)
  * [Retrieve all owners names](#retrieve-all-owners-names)
  * [Get all the dogs an owner has](#get-all-the-dogs-an-owner-has)
  * [Get current booked rooms](#get-current-booked-rooms)
  * [Get room availability](#get-room-availability)
  * [Add new dog to owner](#add-new-dog-to-owner)
  * [Update owner email](#update-owner-email)
  * [Create booking](#create-booking)
  * [Delete booking](#delete-booking)

# Data Model

In this exercise, we are developing the data model of a simple dog hotel registration system.

![Database Model](model.png)


## Configuration

1. At the project root directory create a `.env` file with the following content:

```
POSTGRES_USER="dogHotel"
POSTGRES_PASSWORD="dogHotel123"
POSTGRES_DB="playground"
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@localhost:5432/${POSTGRES_DB}"
```

Execute all the following commands from the root directory of the project.

2. Install all the dependencies

```bash
bun install
```

3. Start the database

```bash
docker-compose up -d
```

4. Apply the Prisma schema to the database

```bash
bun push:db
```

## Database Seeding

1. Seed the database with some test data

```bash
bun seed
```

## Visualizing the database

Data can be visualized using prisma studio, to open it execute

```bash
bun prisma:studio
```

## CRUD operations

Several CRUD operations have been implemented:

### Retrieve all dogs names

Display the command help:

```bash
bun get:dogs --help
```

Retrieves all the dogs names:

```bash
bun get:dogs
```

### Retrieve all dogs breeds

Display the command help:

```bash
bun get:breeds --help
```

Retrieves all the dogs breeds:

```bash
bun get:breeds
```

### Retrieve all owners names

Display the command help:

```bash
bun get:owners --help
```

Retrieves all owners names:

```bash
bun get:owners
```

### Get all the dogs an owner has

Display the command help:

```bash
bun get:dogs:by:owner --help
```

Retrieves all owners names:

```bash
bun get:owners --email <ownerEmail>
```

Example:

```bash
bun get:dogs:by:owner --email ariadna@test.com
```

### Get current booked rooms

Display the command help:

```bash
bun current:booked:rooms --help
```

Retrieves all current booked rooms:

```bash
bun current:booked:rooms
```

### Get room availability

Display the command help:

```bash
bun room:availability --help
```

Retrieves the availability for a specific room given an entry date.

```bash
bun room:availability --rom-number <roomNumber> --date <entryDate>
```

Example:

```bash
bun room:availability --room-number 720 --date 2024-05-02T17:00
```

### Add new dog to owner

Display the command help:

```bash
bun add:dog:to:owner --help
```

Adds a new dog to an existing owner

```bash
bun add:dog:to:owner ---dog-name <dogName> --breed <breed> --email <ownerEmail>
```

Example:

```bash
bun add:dog:to:owner --dog-name Latte --breed Mix --email gloria@test.com
```

### Create booking

Display the command help:

```bash
bun create:booking --help
```

Creates a new booking. Room number, email, dog name and entry date are mandatory fields.

```bash
bun create:booking --room-number <roomNumber> --email <ownerEmail> --dog-name <dogName> --entry-date <entryDate> --exit-date <exitDate> --price <price>
```

Example:

```bash
bun create:booking --room-number 717 --email gloria@test.com --entry-date 2025-04-28T08:00 --exit-date 2025-04-30T08:00 --dog-name Xoco --price 100
```

### Delete booking

Display the command help:

```bash
bun delete:booking --help
```

Deletes a booking.

```bash
bun delete:booking --dog-name <dogName> --entry-date <entryDate>
```

Example:

```bash
bun delete:booking --dog-name Canino --entry-date 2024-04-28T08:00
```

### Update owner email

Display the command help:

```bash
bun update:owner:email --help
```

Updates the email for a given owner.

```bash
bun update:owner:email ---email <currentEmail> --new-email <newEmail>
```

Example:

```bash
bun update:owner:email --email gloria@test.com --new-email glo@test.com
```


    