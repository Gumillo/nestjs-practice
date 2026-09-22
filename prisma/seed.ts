import { PrismaClient } from '@prisma/client';
const db = new PrismaClient();

function getProducts() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
      name: 'Canon EOS 50D',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: 'c920c7b9-a67d-4edb-8ce7-e3c9f3889e56',
      name: 'Canon EOS 5D',
      price: 5000,
      description: 'Professional camera, solid build',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17258',
      name: 'Canon R',
      price: 3000,
      description: 'Professional camera, new technology',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17259',
      name: 'Nikon D50',
      price: 2000,
      description: 'Cheap, ideal for beginners',
    },
    {
      id: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
      name: 'Leica q2',
      price: 5000,
      description: 'Small, compact, innovative',
    },
  ];
}

function getClients() {
  return [
    {
      id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      name: 'John Doe',
      address: '123 Main Street, London',
    },
    {
      id: 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
      name: 'Jane Doe',
      address: '123 Main Street, London',
    },
    {
      id: 'c3d4e5f6-a78b-9c0d-1e2f-3a4b5c6d7e8f',
      name: 'Thomas Jefferson',
      address: 'Baker Street 12B, New York',
    },
  ];
}

function getOrders() {
  return [
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17260',
      clientId: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17261',
      clientId: 'b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e',
      productId: 'fd105551-0f0d-4a9f-bc41-c559c8a17256',
    },
    {
      id: 'fd105551-0f0d-4a9f-bc41-c559c8a17262',
      clientId: 'c3d4e5f6-a78b-9c0d-1e2f-3a4b5c6d7e8f',
      productId: '01c7599d-318b-4b9f-baf7-51f3a936a2d4',
    },
  ];
}

async function seed() {
  await Promise.all(
    getProducts().map((product) => {
      return db.product.create({ data: product });
    }),
  );

  await Promise.all(
    getClients().map((client) => {
      return db.client.create({ data: client });
    }),
  );

  await Promise.all(
    getOrders().map(({ productId, clientId, ...orderData }) => {
      return db.order.create({
        data: {
          ...orderData,
          product: { connect: { id: productId } },
          client: { connect: { id: clientId } },
        },
      });
    }),
  );
}

seed();
