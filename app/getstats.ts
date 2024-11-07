"use server";
import db from "@/lib/db";

export const getStudentStats = async (studentId: string) => {
  const now = new Date();
  const sessions = await db.studysession.findMany({
    where: {
      studentID: studentId,
    },
    select: {
      startTime: true,
      endTime: true,
    },
  });

  const totalMinutes = sessions.reduce((acc, session) => {
    const endTime = session.endTime || now; // Use current time for ongoing sessions
    const duration = endTime.getTime() - session.startTime.getTime();
    return acc + duration / (1000 * 60);
  }, 0);

  const completedSessions = sessions.filter((s) => s.endTime).length;
  const ongoingSessions = sessions.filter((s) => !s.endTime).length;

  return {
    totalSessions: sessions.length,
    completedSessions,
    ongoingSessions,
    totalMinutes: Math.floor(totalMinutes),
    totalHours: Math.floor(totalMinutes / 60),
    totalMinutesRemainder: Math.floor(totalMinutes % 60),
    formattedStudyTime: `${Math.floor(totalMinutes / 60)}시간 ${Math.floor(
      totalMinutes % 60
    )}분`,
  };
};
