/*
  Warnings:

  - You are about to drop the column `userId` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `preference` on the `Preferences` table. All the data in the column will be lost.
  - Added the required column `alcohol` to the `Preferences` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_chatId_fkey";

-- DropForeignKey
ALTER TABLE "Move" DROP CONSTRAINT "Move_userId_fkey";

-- DropForeignKey
ALTER TABLE "Preferences" DROP CONSTRAINT "Preferences_userId_fkey";

-- AlterTable
ALTER TABLE "Move" DROP COLUMN "userId";
ALTER TABLE "Move" ADD COLUMN     "ownerId" INT4 NOT NULL DEFAULT -1;
ALTER TABLE "Move" ADD COLUMN     "userIds" INT4[];

-- AlterTable
ALTER TABLE "Preferences" DROP COLUMN "preference";
ALTER TABLE "Preferences" ADD COLUMN     "alcohol" BOOL NOT NULL;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
