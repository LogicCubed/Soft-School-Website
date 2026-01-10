"use client";

import { useUser } from "@clerk/nextjs";
import { DangerZone } from "./danger-zone";
import { useDeleteProgressModal } from "@/store/use-delete-progress-modal";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Profile = () => {
  const { user } = useUser();
  const { openDeleteProgressModal } = useDeleteProgressModal();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);

  if (!user) return null;

  return (
    <div className="p-6 space-y-4 rounded-lg w-full">
      <div>
        <label className="block mb-1 font-bold text-2xl" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={user.firstName + " " + user.lastName}
          readOnly
          className="w-full border border-slate-600 bg-slate-800 text-white text-semibold rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-2xl" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={user.username || ""}
          readOnly
          className="w-full border border-slate-600 bg-slate-800 text-white text-semibold rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-2xl" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={user.emailAddresses[0]?.emailAddress || ""}
          readOnly
          className="w-full border border-slate-600 bg-slate-800 text-white text-semibold rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      <div>
        <label className="block mb-1 font-bold text-2xl" htmlFor="currentPassword">
          Current Password
        </label>
        <div className="relative">
            <input
                id="currentPassword"
                type={showCurrentPassword ? "text" : "password"}
                value="Placeholder Password"
                readOnly
                className="w-full border border-slate-600 bg-slate-800 text-white font-semibold rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400 pr-10"
            />
            <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
            >
                {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
      </div>

      <div>
        <label className="block mb-1 font-bold text-2xl" htmlFor="newPassword">
          New Password
        </label>
        <input
          id="newPassword"
          type="password"
          readOnly
          className="w-full border border-slate-600 bg-slate-800 text-white text-semibold rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />
      </div>

      <DangerZone onReset={openDeleteProgressModal} />
    </div>
  );
};

export default Profile;