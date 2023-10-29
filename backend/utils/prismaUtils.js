const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getLastTenMessagesByUserInChat = async (userId, chatId) => {
  try {
      const messages = await prisma.message.findMany({
      where: {
        authorId: userId,
        chatId: chatId,
      },
      orderBy: {
        timestamp: 'desc', // Orders the messages by timestamp in descending order
      },
      take: 10, // Limits the number of returned messages to 10
    });
    return messages.map((message) => message.text);
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
}

module.exports = {getLastTenMessagesByUserInChat};
