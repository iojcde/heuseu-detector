-- CreateTable
CREATE TABLE "studysession" (
    "id" SERIAL NOT NULL,
    "studentID" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),

    CONSTRAINT "studysession_pkey" PRIMARY KEY ("id")
);
