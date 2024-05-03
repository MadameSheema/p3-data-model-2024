# Index

* [Data Model](#data-model)
* [Configuration](#configuration)
* [Database seeding](#database-seeding)
* [Crud operations](#crud-operations)
  * [Retrieve dogs names](#retrieve-dogs-names)
  * [Retrieve all dogs breeds](#retrieve-all-dogs-breeds)
  * [Retrieve all owners names](#retrieve-all-owners-names)
  * [Get all the dogs an owner has](#get-all-the-dogs-an-owner-has)
  * [Get current booked rooms](#get-current-booked-rooms)
  * [Get room availability](#get-room-availability)
  * [Add dog to owner](#add-dog-to-owner)
  * [Update owner email](#update-owner-email)

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

```cli
bun install
```

3. Start the database

```bash
docker-compose up
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

## CRUD operations

Several CRUD operations have been implemented:

### Retrieve dogs names

Display the command help:

```bash
bun get:dogs --help
```

Retrieves dogs names:

```bash
bun get:dogs
```

### Retrieve all dogs breeds

Display the command help:

```bash
bun get:breeds --help
```

Retrieves dogs breeds:

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
bun room:availability --rom-number <roomNumber> --entry-date <entryDate>
```

Example:

```bash
bun room:availability --room-number 720 --entry-date 2024-05-02T17:00:00.000Z
```

### Add dog to owner

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
bun add:dog:to:owner ---dog-name Latte --breed Mix --email gloria@test.com
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

### Create booking

### Delete booking

    