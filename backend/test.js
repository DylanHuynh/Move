const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createUser() {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
      });
      console.log('New user created:', newUser);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
  
  createUser();