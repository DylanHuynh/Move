const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({
    // Specify the log level you want (e.g., 'info', 'warn', 'error', 'query', or 'info,error').
    log: ['query', 'info', 'error'],
  });

const resolvers = {
    Query: {
      // Fetch all users
      users: async () => {
        return prisma.user.findMany();
      },
      // Fetch a single user by ID
      user: async (_, args) => {
        return prisma.user.findUnique({
          where: { id: parseInt(args.id) },
        });
      },
    },
    Mutation: {
      // Create a new user
      createUser: async (_, args) => {
        try {
          const newUser = await prisma.user.create({
            data: {
              name: args.name,
              email: args.email,
            },
          });
          return newUser; // Make sure it returns a non-null value.
        } catch (error) {
          console.error('Error creating user:', error);
          throw new Error("Failed to create user");
        }
      },
      
    //   // Update a user by ID
    //   updateUser: async (_, args) => {
    //     return prisma.user.update({
    //       where: { id: parseInt(args.id) },
    //       data: {
    //         name: args.name,
    //         email: args.email,
    //       },
    //     });
    //   },
    //   // Delete a user by ID
    //   deleteUser: async (_, args) => {
    //     return prisma.user.delete({
    //       where: { id: parseInt(args.id) },
    //     });
    //   },
    },
  };
  
module.exports = resolvers;