-- AlterTable
ALTER TABLE "User" ADD COLUMN     "calendarIDs" INT4[];
ALTER TABLE "User" ADD COLUMN     "friendIDs" INT4[];

-- CreateTable
CREATE TABLE "Chat" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "friendIDs" INT4[],
    "messageIDs" INT4[],
    "creationTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ownerId" INT4 NOT NULL,
    "type" STRING NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Move" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "location" STRING NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "userId" INT4 NOT NULL,
    "description" STRING NOT NULL,
    "chatID" INT4 NOT NULL,
    "type" STRING NOT NULL,
    "status" STRING NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "chatID" INT4 NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "authorID" INT4 NOT NULL,
    "text" STRING NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "id" INT4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
    "userID" INT4 NOT NULL,
    "preference" STRING NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_userID_key" ON "Preferences"("userID");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_chatID_fkey" FOREIGN KEY ("chatID") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatID_fkey" FOREIGN KEY ("chatID") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_authorID_fkey" FOREIGN KEY ("authorID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferences" ADD CONSTRAINT "Preferences_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
