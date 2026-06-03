"use client";

import React from "react";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import QuestionRow from "./QuestionRow";

import type { FormSection, QuestionType } from "@/lib/application/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type NewQuestion = {
  id: string;
  label: string;
  type: QuestionType;
  required: boolean;
};

export default function QuestionsList({
  sections,
  setSections,
}: {
  sections: FormSection[];
  setSections: React.Dispatch<React.SetStateAction<FormSection[]>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [activeSectionId, setActiveSectionId] = React.useState<string | null>(
    null,
  );

  const [form, setForm] = React.useState<NewQuestion>({
    id: "",
    label: "",
    type: "short_text",
    required: false,
  });

  function handleDragEnd(event: DragEndEvent, sectionId: string) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;

        const oldIndex = section.questions.findIndex((q) => q.id === active.id);
        const newIndex = section.questions.findIndex((q) => q.id === over.id);

        return {
          ...section,
          questions: arrayMove(section.questions, oldIndex, newIndex),
        };
      }),
    );
  }

  function openDialog(sectionId: string) {
    setActiveSectionId(sectionId);
    setForm({
      id: "",
      label: "",
      type: "short_text",
      required: false,
    });
    setOpen(true);
  }

  function handleAddQuestion() {
    if (!activeSectionId) return;

    const newQuestion = {
      id:
        form.id ||
        globalThis.crypto?.randomUUID?.() ||
        `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      label: form.label,
      type: form.type,
      required: form.required,
    };

    setSections((prev) =>
      prev.map((section) =>
        section.id === activeSectionId
          ? {
              ...section,
              questions: [...section.questions, newQuestion],
            }
          : section,
      ),
    );

    setOpen(false);
  }

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.id} className="border p-3 rounded space-y-2">
          <div className="flex justify-between">
            <h3 className="font-semibold">{section.title}</h3>

            <Button variant="outline" onClick={() => openDialog(section.id)}>
              Add Question
            </Button>
          </div>

          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={(event) => handleDragEnd(event, section.id)}
          >
            <SortableContext
              items={section.questions.map((q) => q.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-2">
                {section.questions.map((q) => (
                  <QuestionRow key={q.id} question={q} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Question</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <Input
              placeholder="ID"
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
            />

            <Input
              placeholder="Label"
              value={form.label}
              onChange={(e) => setForm({ ...form, label: e.target.value })}
            />

            <Select
              value={form.type}
              onValueChange={(v) =>
                setForm({ ...form, type: v as QuestionType })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="short_text">Short Text</SelectItem>
                <SelectItem value="long_text">Long Text</SelectItem>
                <SelectItem value="select">Select</SelectItem>
                <SelectItem value="multi_select">Multi Select</SelectItem>
                <SelectItem value="file_upload">File Upload</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.required}
                onCheckedChange={(v) => setForm({ ...form, required: !!v })}
              />
              <span>Required</span>
            </div>

            <Button onClick={handleAddQuestion}>Add Question</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
