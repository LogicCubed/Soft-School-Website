import { getVideoUrl } from "@/db/queries";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { challengeId } = req.query;

    if (!challengeId) {
        return res.status(400).json({ error: "Missing challengeId" });
    }

    try {
        const videoUrl = await getVideoUrl(Number(challengeId));
        return res.status(200).json({ videoUrl });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch video URL" });
    }
}
