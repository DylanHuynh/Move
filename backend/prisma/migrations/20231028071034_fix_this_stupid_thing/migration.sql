/*
  Warnings:

  - You are about to drop the column `friendIDs` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `messageIDs` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `authorID` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `chatID` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `chatID` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Preferences` table. All the data in the column will be lost.
  - You are about to drop the column `calendarIDs` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `friendIDs` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Preferences` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `authorId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatId` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chatId` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Preferences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_authorID_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatID_fkey";

-- DropForeignKey
ALTER TABLE "Move" DROP CONSTRAINT "Move_chatID_fkey";

-- DropForeignKey
ALTER TABLE "Preferences" DROP CONSTRAINT "Preferences_userID_fkey";

-- DropIndex
DROP INDEX "Preferences_userID_key";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "friendIDs";
ALTER TABLE "Chat" DROP COLUMN "messageIDs";
ALTER TABLE "Chat" ADD COLUMN     "friendIds" INT4[];
ALTER TABLE "Chat" ADD COLUMN     "messageIds" INT4[];

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "authorID";
ALTER TABLE "Message" DROP COLUMN "chatID";
ALTER TABLE "Message" ADD COLUMN     "authorId" INT4 NOT NULL;
ALTER TABLE "Message" ADD COLUMN     "chatId" INT4 NOT NULL;
ALTER TABLE "Message" ALTER COLUMN "timestamp" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Move" DROP COLUMN "chatID";
ALTER TABLE "Move" ADD COLUMN     "chatId" INT4 NOT NULL;

-- AlterTable
ALTER TABLE "Preferences" DROP COLUMN "userID";
ALTER TABLE "Preferences" ADD COLUMN     "userId" INT4 NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "calendarIDs";
ALTER TABLE "User" DROP COLUMN "friendIDs";
ALTER TABLE "User" ADD COLUMN     "calendarIds" INT4[];
ALTER TABLE "User" ADD COLUMN     "friendIds" INT4[];

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_userId_key" ON "Preferences"("userId");

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
