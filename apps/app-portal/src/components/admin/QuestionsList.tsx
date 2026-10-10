"use client";

import React from "react";

import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";

import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import QuestionRow from "./QuestionRow";

import type {
  FormSection,
  Question,
  QuestionOption,
  QuestionType,
} from "@/lib/application/types";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  description: string;
  // Existing options keep their stored value so applicants' saved answers still match;
  // new options get a value generated from their label on save.
  options: QuestionOption[];
  // Kept as strings so the number inputs can be cleared.
  maxLength: string;
  maxWords: string;
};

const EMPTY_FORM: NewQuestion = {
  id: "",
  label: "",
  type: "short_text",
  required: false,
  description: "",
  options: [],
  maxLength: "",
  maxWords: "",
};

function isChoiceType(type: QuestionType): boolean {
  return type === "select" || type === "multi_select";
}

function toOptionValue(label: string): string {
  return label
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function parseLimit(raw: string, name: string): number | undefined {
  if (raw.trim() === "") return undefined;
  const n = Number(raw);
  if (!Number.isInteger(n) || n <= 0) {
    throw new Error(`${name} must be a whole number greater than 0.`);
  }
  return n;
}

// Turns the dialog state into a Question, keeping any fields the dialog doesn't edit
// (e.g. a file upload's accepted types) and dropping the ones that don't apply to the type.
// Throws with a user-facing message when the input is invalid.
function buildQuestion(
  form: NewQuestion,
  id: string,
  base?: Question,
): Question {
  const label = form.label.trim();
  if (!label) throw new Error("Question text is required.");

  const {
    options: _options,
    maxLength: _maxLength,
    maxWords: _maxWords,
    description: _description,
    accept,
    ...rest
  } = base ?? ({} as Partial<Question>);
  void _options;
  void _maxLength;
  void _maxWords;
  void _description;

  const question: Question = {
    ...rest,
    id,
    label,
    type: form.type,
    required: form.required,
  };

  const description = form.description.trim();
  if (description) question.description = description;

  if (isChoiceType(form.type)) {
    const seen = new Set<string>();
    const options = form.options.map((option, i) => {
      const optionLabel = option.label.trim();
      if (!optionLabel) throw new Error(`Option ${i + 1} is empty.`);
      const value =
        option.value || toOptionValue(optionLabel) || `option_${i + 1}`;
      if (seen.has(value)) {
        throw new Error(`Two options are the same: "${optionLabel}".`);
      }
      seen.add(value);
      return { value, label: optionLabel };
    });
    if (options.length === 0) {
      throw new Error("Add at least one option.");
    }
    question.options = options;
  }

  if (form.type === "short_text" || form.type === "long_text") {
    const maxLength = parseLimit(form.maxLength, "Max characters");
    if (maxLength) question.maxLength = maxLength;
  }
  if (form.type === "long_text") {
    const maxWords = parseLimit(form.maxWords, "Max words");
    if (maxWords) question.maxWords = maxWords;
  }
  if (form.type === "file_upload" && accept) question.accept = accept;

  return question;
}

export default function QuestionsList({
  sections,
  setSections,
}: {
  sections: FormSection[];
  setSections: React.Dispatch<React.SetStateAction<FormSection[]>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [editingQuestionId, setEditingQuestionId] = React.useState<
    string | null
  >(null);
  const [activeSectionId, setActiveSectionId] = React.useState<string | null>(
    null,
  );

  const [form, setForm] = React.useState<NewQuestion>(EMPTY_FORM);
  const [formError, setFormError] = React.useState<string | null>(null);

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

  function deleteQuestion(questionId: string) {
    setSections((current) =>
      current.map((section) => ({
        ...section,
        questions: section.questions.filter(
          (question) => question.id !== questionId,
        ),
      })),
    );
  }

  function openEditDialog(question: Question, sectionId: string) {
    setActiveSectionId(sectionId);

    setEditingQuestionId(question.id);

    setForm({
      id: question.id,
      label: question.label,
      type: question.type,
      required: question.required,
      description: question.description ?? "",
      options: question.options ? [...question.options] : [],
      maxLength: question.maxLength?.toString() ?? "",
      maxWords: question.maxWords?.toString() ?? "",
    });
    setFormError(null);

    setOpen(true);
  }

  function openDialog(sectionId: string) {
    setActiveSectionId(sectionId);
    setEditingQuestionId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setOpen(true);
  }

  function handleAddQuestion() {
    if (!activeSectionId) return;

    const id =
      form.id.trim() ||
      globalThis.crypto?.randomUUID?.() ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const idTaken = sections.some((section) =>
      section.questions.some((question) => question.id === id),
    );
    if (idTaken) {
      setFormError(`A question with the internal name "${id}" already exists.`);
      return;
    }

    let newQuestion: Question;
    try {
      newQuestion = buildQuestion(form, id);
    } catch (err) {
      setFormError((err as Error).message);
      return;
    }

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

  function handleEditQuestion() {
    if (!activeSectionId || !editingQuestionId) return;

    const existing = sections
      .find((section) => section.id === activeSectionId)
      ?.questions.find((question) => question.id === editingQuestionId);
    if (!existing) return;

    let updated: Question;
    try {
      updated = buildQuestion(form, editingQuestionId, existing);
    } catch (err) {
      setFormError((err as Error).message);
      return;
    }

    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== activeSectionId) return section;

        return {
          ...section,
          questions: section.questions.map((question) =>
            question.id === editingQuestionId ? updated : question,
          ),
        };
      }),
    );

    setEditingQuestionId(null);
    setOpen(false);
  }

  function updateOption(index: number, label: string) {
    setForm((current) => ({
      ...current,
      options: current.options.map((option, i) =>
        i === index ? { ...option, label } : option,
      ),
    }));
  }

  function addOption() {
    setForm((current) => ({
      ...current,
      options: [...current.options, { value: "", label: "" }],
    }));
  }

  function removeOption(index: number) {
    setForm((current) => ({
      ...current,
      options: current.options.filter((_, i) => i !== index),
    }));
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
                  <QuestionRow
                    key={q.id}
                    question={q}
                    onDelete={deleteQuestion}
                    onEdit={() => openEditDialog(q, section.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingQuestionId ? "Edit Question" : "Add Question"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <div className="space-y-1">
              <Input
                placeholder="e.g. favorite_hackathon_snack"
                value={form.id}
                disabled={!!editingQuestionId}
                onChange={(e) => setForm({ ...form, id: e.target.value })}
              />
              <p className="text-xs text-gray-500">
                {editingQuestionId
                  ? "Internal name can't be changed once a question exists — existing answers are stored under it."
                  : "Internal name used to store answers — lowercase with underscores, no spaces. Applicants never see this."}
              </p>
            </div>

            <div className="space-y-1">
              <Input
                placeholder="e.g. What's your favorite hackathon snack?"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
              />
              <p className="text-xs text-gray-500">
                The actual question text applicants will read and answer.
              </p>
            </div>

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

            <div className="space-y-1">
              <Textarea
                placeholder="Optional"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <p className="text-xs text-gray-500">
                Helper text shown under the question.
              </p>
            </div>

            {isChoiceType(form.type) && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Options</p>
                {form.options.map((option, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder={`Option ${i + 1}`}
                      value={option.label}
                      onChange={(e) => updateOption(i, e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      aria-label={`Remove option ${i + 1}`}
                      onClick={() => removeOption(i)}
                    >
                      ✕
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                >
                  Add option
                </Button>
                <p className="text-xs text-gray-500">
                  Removing an option applicants already picked will leave their
                  saved answer unmatched.
                </p>
              </div>
            )}

            {(form.type === "short_text" || form.type === "long_text") && (
              <div className="flex gap-3">
                <div className="flex-1 space-y-1">
                  <Input
                    type="number"
                    min={1}
                    placeholder="No limit"
                    value={form.maxLength}
                    onChange={(e) =>
                      setForm({ ...form, maxLength: e.target.value })
                    }
                  />
                  <p className="text-xs text-gray-500">Max characters</p>
                </div>
                {form.type === "long_text" && (
                  <div className="flex-1 space-y-1">
                    <Input
                      type="number"
                      min={1}
                      placeholder="No limit"
                      value={form.maxWords}
                      onChange={(e) =>
                        setForm({ ...form, maxWords: e.target.value })
                      }
                    />
                    <p className="text-xs text-gray-500">Max words</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center gap-2">
              <Checkbox
                checked={form.required}
                onCheckedChange={(v) => setForm({ ...form, required: !!v })}
              />
              <span>Required</span>
            </div>

            {formError && (
              <p className="text-sm text-firecrackerRed">{formError}</p>
            )}

            <Button
              onClick={
                editingQuestionId ? handleEditQuestion : handleAddQuestion
              }
            >
              {editingQuestionId ? "Save Question" : "Add Question"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
