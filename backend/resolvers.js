const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_, { id }) => prisma.user.findUnique({ where: { id } }),
    chats: () => prisma.chat.findMany(),
    chat: (_, { id }) => prisma.chat.findUnique({ where: { id } }),
    moves: () => prisma.move.findMany(),
    move: (_, { id }) => prisma.move.findUnique({ where: { id } }),
    messages: () => prisma.message.findMany(),
    message: (_, { id }) => prisma.message.findUnique({ where: { id } }),
  },
  Mutation: {
    createUser: (_, { name, email }) => prisma.user.create({ data: { name, email } }),
    createChat: (_, { ownerId, type }) => prisma.chat.create({ data: { ownerId, type } }),
    createMove: (_, { title, userId, location, time, description, chatId, type, status }) =>
      prisma.move.create({ data: { title, userId, location, time, description, chatId, type, status } }),
    createMessage: (_, { chatId, authorId, text }) =>
      prisma.message.create({ data: { chatId, authorId, text } }),
    createPreferences: (_, { userId, preference }) =>
      prisma.preferences.create({ data: { userId, preference } }),
    deleteUser: (_, { userId }) => prisma.user.delete({ where: { id: userId }, }),
    deleteUsers: (_, {}) => prisma.user.deleteMany({})
  },
  User: {
    chats: (parent) => prisma.user.findUnique({ where: { id: parent.id } }).chats(),
    messages: (parent) => prisma.user.findUnique({ where: { id: parent.id } }).messages(),
  },
  Chat: {
    owner: (parent) => prisma.chat.findUnique({ where: { id: parent.id } }).owner(),
    messages: (parent) => prisma.chat.findUnique({ where: { id: parent.id } }).messages(),
    moves: (parent) => prisma.chat.findUnique({ where: { id: parent.id } }).moves(),
  },
  Move: {
    user: (parent) => prisma.move.findUnique({ where: { id: parent.id } }).user(),
    chat: (parent) => prisma.move.findUnique({ where: { id: parent.id } }).chat(),
  },
  Message: {
    chat: (parent) => prisma.message.findUnique({ where: { id: parent.id } }).chat(),
    author: (parent) => prisma.message.findUnique({ where: { id: parent.id } }).author(),
  },
  Preferences: {
    user: (parent) => prisma.preferences.findUnique({ where: { id: parent.id } }).user(),
  },
};

module.exports = resolvers;
