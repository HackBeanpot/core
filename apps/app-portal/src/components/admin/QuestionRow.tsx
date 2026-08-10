"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import type { Question } from "@/lib/application/types";

type QuestionRowProps = {
  question: Question;
  onDelete: (questionId: string) => void;
  onEdit: (question: Question) => void;
};

export default function QuestionRow({
  question,
  onDelete,
  onEdit,
}: QuestionRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between rounded border p-3"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab px-2 text-gray-400"
      >
        ☰
      </div>

      <div className="flex-1">
        <p className="font-medium">{question.label}</p>
        <p className="text-xs text-gray-500">
          {question.type} {question.required ? "• required" : ""}
        </p>
      </div>

      <div className="flex gap-2">
        <button
          className="border px-2 py-1 rounded text-sm"
          onClick={() => onEdit(question)}
        >
          Edit
        </button>

        <button
          style={{ backgroundColor: "crimson" }}
          className="border px-2 py-1 text-white rounded text-sm"
          onClick={() => onDelete(question.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
