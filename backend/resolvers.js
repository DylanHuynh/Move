const { PrismaClient } = require('@prisma/client');
const { getMoveTitle } = require('./llm/getMoveTitle');
const { getReply } = require('./llm/getReply');
const { insertVector } = require("./llm/vectorDB");

const prisma = new PrismaClient();
const MESSAGE_CHUNK_SIZE = 1;
const LLM_AUTHOR_ID = 0;

const resolvers = {
  Query: {
    users: () => prisma.user.findMany(),
    user: (_, { id }) => prisma.user.findUnique({ where: { id } }),
    getChatByUserId: (_, { userId }) => {
      return null;
      const user = prisma.user.findUnique({ where: { userId }});
      if (!user || !user.chats) {
        return null;
      }
      for (const chat of user.chats) {
        if (chat.type == 'solo') {
          return chat;
        }
      }
    },
    chats: () => prisma.chat.findMany(),
    chat: (_, { id }) => prisma.chat.findUnique({ where: { id } }),
    getUserMoves: (_, { userId, status}) => prisma.move.findMany({ where: { userId, status}}),
    moves: () => prisma.move.findMany(),
    move: (_, { id }) => prisma.move.findUnique({ where: { id } }),
    messages: () => prisma.message.findMany(),
    message: (_, { id }) => prisma.message.findUnique({ where: { id } }),
  },
  Mutation: {
    createAIUser: (_, {  }) => prisma.user.create({ data: { id: 0, name: "MoveAI", email: "" } }),
    createUser: (_, { id, name, email }) => prisma.user.create({ data: { id, name, email } }),
    createChat: (_, { ownerId, type }) => prisma.chat.create({ data: { ownerId, type } }),
    createMove: async (_, { userId, location, time, description, chatId, type, status }) => {
      const title = await getMoveTitle(description);
      return prisma.move.create({ data: { title, userId, location, time, description, chatId, type, status } })},
    createMessage: async (_, { chatId, authorId, text }) => {
      await prisma.message.create({ data: { chatId, authorId, text } });
      const userMessages = await prisma.user.findUnique({ where: { id: authorId } }).messages()
        .then((response) =>
          response.map((message) => message.text));
      if (userMessages.length % MESSAGE_CHUNK_SIZE == 0) {
        insertVector(userMessages.slice(-MESSAGE_CHUNK_SIZE).join(" "), "message");
      }
      const user = await prisma.user.findUnique({ where: { id: authorId } })
      console.log(user)
      const reply = await getReply(user, text);
      return prisma.message.create({ data: { id, chatId, authorId: LLM_AUTHOR_ID, text: reply } });
    },
    createPreferences: (_, { userId, preference }) =>
      prisma.preferences.create({ data: { userId, preference } }),
    addFriend: async (_, { userId, friendId }) => {
      // Check if the user and the friend exist
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const friend = await prisma.user.findUnique({ where: { id: friendId } });

      if (!user || !friend) {
        throw new Error("User or friend not found");
      }

      // Check if they are already friends
      if (user.friendIds.includes(friendId) || friend.friendIds.includes(userId)) {
        throw new Error("These users are already friends");
      }

      // Update the user's friendIds list
      const updatedUserFriendIds = [...user.friendIds, friendId];
      await prisma.user.update({
        where: { id: userId },
        data: { friendIds: updatedUserFriendIds },
      });

      // Update the friend's friendIds list
      const updatedFriendFriendIds = [...friend.friendIds, userId];
      await prisma.user.update({
        where: { id: friendId },
        data: { friendIds: updatedFriendFriendIds },
      });

      return "Friend added successfully!";
    },
    addFriendByEmail: async (_, { userId, email }) => {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      const friend = await prisma.user.findUnique({ where: { email: email } });

      if (!user || !friend) {
        throw new Error("User or friend not found");
      }

      if (user.friendIds.includes(friend.id) || friend.friendIds.includes(user.id)) {
        throw new Error("These users are already friends");
      }

      const updatedUserFriendIds = [...user.friendIds, friend.id];
      await prisma.user.update({
        where: { id: userId },
        data: { friendIds: updatedUserFriendIds },
      });

      const updatedFriendFriendIds = [...friend.friendIds, userId];
      await prisma.user.update({
        where: { id: friend.id },
        data: { friendIds: updatedFriendFriendIds },
      });

      return "Friend added successfully!";
    },
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
