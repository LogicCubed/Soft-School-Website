"use client";

import { Separator } from "../ui/separator";

export default function Preferences() {
  return (
    <div className="w-full space-y-6">
      <h2 className="text-3xl font-bold text-left w-full">Lesson Experience</h2>

      <Separator className="h-0.5 rounded-full bg-slate-600" />

      <div className="flex justify-between items-center w-full font-bold text-2xl">
        <span>Sound Effects</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-sky-500 transition-colors"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform"></div>
        </label>
      </div>

      <div className="flex justify-between items-center w-full font-bold text-2xl">
        <span>Animations</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-sky-500 transition-colors"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform"></div>
        </label>
      </div>

      <div className="flex justify-between items-center w-full font-bold text-2xl">
        <span>Motivational Messages</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-sky-500 transition-colors"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform"></div>
        </label>
      </div>

      <div className="flex justify-between items-center w-full font-bold text-2xl">
        <span>Listening Exercises</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-sky-500 transition-colors"></div>
          <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform peer-checked:translate-x-5 transition-transform"></div>
        </label>
      </div>
    </div>
  );
}