import { getVideoUrl } from "@/db/queries";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { challengeId } = req.query;
    const videoUrl = await getVideoUrl(Number(challengeId));

    if (!challengeId) {
        return res.status(400).json({ error: "Missing challengeId" });
    }

    return res.status(200).json({ videoUrl });
}
