import { Suspense } from "react";
import { InfoPageContents } from "./info-client";
import { getStudentStats } from "../getstats";

const InfoPage = async ({ searchParams }: any) => {
  const { id } = await searchParams;
  const stats = await getStudentStats(id);

  return (
    <Suspense>
      <InfoPageContents stats={stats} />
    </Suspense>
  );
};

export default InfoPage;
