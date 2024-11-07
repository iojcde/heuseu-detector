"use server";
import db from "@/lib/db";

export const studyCheckAction = async (studentID: string) => {
  const unendedcheckstoday = await db.studysession.findFirst({
    where: {
      studentID,
      date: new Date(),
      endTime: null,
    },
  });

  if (!unendedcheckstoday) {
    await db.studysession.create({
      data: {
        studentID,
        date: new Date(),
        startTime: new Date(),
      },
    });

    return { type: "start" };
  } else {
    await db.studysession.update({
      where: {
        id: unendedcheckstoday.id,
      },
      data: {
        endTime: new Date(),
      },
    });

    return { type: "end" };
  }
};
