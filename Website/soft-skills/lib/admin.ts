import { auth } from "@clerk/nextjs/server"

const adminIds = [
    "user_2vLAwIvbZeBfDwuZyTwooRpjDTx",
    "user_2vQ2huOD2do4YLc2KoeEj7bwRb8",
];

export const isAdmin = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    return adminIds.includes(userId);
}