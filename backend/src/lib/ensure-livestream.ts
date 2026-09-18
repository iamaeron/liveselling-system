import { liveStream } from "../db/schema";
import { db } from "@/db";

export async function ensureLiveStreamExists(pageId: string, postId: string) {
  await db
    .insert(liveStream)
    .values({
      facebookPageId: pageId,
      facebookVideoId: postId,
      title: "Live Stream",
    })
    .onConflictDoNothing({ target: liveStream.facebookVideoId });

  const stream = await db.query.liveStream.findFirst({
    where: {
      facebookVideoId: postId,
    },
  });

  return stream;
}
