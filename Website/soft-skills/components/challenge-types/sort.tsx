"use client";

import React, { useState, useEffect } from "react";

type Option = {
  id: number;
  challengeId: number;
  text: string;
  correct: boolean;
  explanation: string;
};

type ContainerType = "A" | "B" | "unassigned";

type Props = {
  callToAction?: string;
  options: Option[];
  onSortChange: (assignments: { [optionId: number]: ContainerType }) => void;
  disabled?: boolean;
  onAllAssignedChange?: (allAssigned: boolean) => void;
};

export const Sort = ({
  callToAction,
  options,
  onSortChange,
  disabled,
  onAllAssignedChange,
}: Props) => {
  const [assignments, setAssignments] = useState<{ [key: number]: ContainerType }>(() => {
    const init: { [key: number]: ContainerType } = {};
    options.forEach((o) => {
      init[o.id] = "unassigned";
    });
    return init;
  });

  const [draggingOptionId, setDraggingOptionId] = useState<number | null>(null);

  useEffect(() => {
    onSortChange(assignments);

    if (onAllAssignedChange) {
      const allAssigned = Object.values(assignments).every((v) => v !== "unassigned");
      onAllAssignedChange(allAssigned);
    }
  }, [assignments, onSortChange, onAllAssignedChange]);

  const onDragStart = (e: React.DragEvent<HTMLDivElement>, optionId: number) => {
    if (disabled) return;
    setDraggingOptionId(optionId);
    e.dataTransfer.setData("text/plain", optionId.toString());
  };

  const onDragEnd = () => {
    setDraggingOptionId(null);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, container: ContainerType) => {
    e.preventDefault();
    if (disabled) return;
    const optionIdStr = e.dataTransfer.getData("text/plain");
    if (!optionIdStr) return;
    const optionId = Number(optionIdStr);
    if (assignments[optionId] !== container) {
      setAssignments((prev) => ({ ...prev, [optionId]: container }));
    }
    setDraggingOptionId(null);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const unassignOption = (optionId: number) => {
    if (disabled) return;
    setAssignments((prev) => ({ ...prev, [optionId]: "unassigned" }));
  };

  function moveOption(optionId: number, container: ContainerType) {
    if (disabled) return;
    setAssignments((prev) => ({ ...prev, [optionId]: container }));
  }

  const renderOption = (option: Option) => {
    const isDragging = draggingOptionId === option.id;

    return (
      <div
        key={option.id}
        draggable={!disabled}
        onDragStart={(e) => onDragStart(e, option.id)}
        onDragEnd={onDragEnd}
        className="p-2 mb-1 border rounded cursor-move bg-white hover:bg-gray-100 select-none transition-transform duration-150 hover:scale-105"
        style={{
          transform: isDragging ? "none" : undefined,
          transitionProperty: "transform",
          transitionDuration: "150ms",
          transitionTimingFunction: "ease-in-out",
        }}
        onClick={() =>
          assignments[option.id] === "unassigned"
            ? moveOption(option.id, "A")
            : unassignOption(option.id)
        }
      >
        {option.text}
      </div>
    );
  };

  return (
    <div>
      {callToAction && <div className="mb-4 text-lg text-gray-700">{callToAction}</div>}

      <div className="flex gap-6 w-full max-w-[1000px] mx-auto">
        {/* Pool */}
        <div
          className="flex-[1.5] h-[300px] overflow-y-auto border p-4 rounded bg-gray-50 flex-shrink-0"
          onDrop={(e) => onDrop(e, "unassigned")}
          onDragOver={onDragOver}
        >
          <h3 className="mb-2 font-semibold">Options</h3>
          {options.filter((o) => assignments[o.id] === "unassigned").map(renderOption)}
        </div>

        {/* Container A */}
        <div
          className="flex-1 h-[300px] overflow-y-auto border p-4 rounded bg-white flex-shrink-0"
          onDrop={(e) => onDrop(e, "A")}
          onDragOver={onDragOver}
        >
          <h3 className="mb-2 font-semibold">Helpful Responses</h3>
          {options.filter((o) => assignments[o.id] === "A").map(renderOption)}
        </div>

        {/* Container B */}
        <div
          className="flex-1 h-[300px] overflow-y-auto border p-4 rounded bg-white flex-shrink-0"
          onDrop={(e) => onDrop(e, "B")}
          onDragOver={onDragOver}
        >
          <h3 className="mb-2 font-semibold">Unhelpful Responses</h3>
          {options.filter((o) => assignments[o.id] === "B").map(renderOption)}
        </div>
      </div>
    </div>
  );
};