import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getTopTenUsers } from "@/db/queries";

const Leaderboard = async () => {
  const leaderboard = await getTopTenUsers();

  return (
    <div className="mt-1 w-full rounded-xl bg-indigo-500 p-5 text-white border-2 border-b-[6px] border-indigo-600">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">Leaderboard</h3>
        <p className="text-lg font-semibold">Top learners this week:</p>

        <div className="space-y-2 pt-2">
          {leaderboard.slice(0, 5).map((user, index) => (
            <div key={user.userId} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <p className="font-bold text-white">{index + 1}</p>
                <Avatar className="border bg-sky-500 h-8 w-8">
                  <AvatarImage className="object-cover" src={user.userImageSrc} />
                </Avatar>
                <p className="font-semibold">{user.userName}</p>
              </div>
              <p className="text-sm font-semibold">{user.points} XP</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;