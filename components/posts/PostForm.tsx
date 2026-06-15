"use client";

import { useState, type FormEvent } from "react";
import type { CreatePostInput, Post } from "@/types";
import { useUsers } from "@/hooks/queries/useUsers";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import UserSelect from "@/components/ui/UserSelect";

interface FormValues {
  title: string;
  body: string;
  userId: number | null;
}

interface FormErrors {
  title?: string;
  body?: string;
  userId?: string;
}

interface PostFormProps {
  initialValues?: Partial<Post>;
  onSubmit: (data: CreatePostInput) => void;
  isPending: boolean;
  submitLabel: string;
  onCancel?: () => void;
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.title.trim()) {
    errors.title = "Title is required";
  } else if (values.title.trim().length < 3) {
    errors.title = "Title must be at least 3 characters";
  } else if (values.title.trim().length > 150) {
    errors.title = "Title must be under 150 characters";
  }

  if (!values.body.trim()) {
    errors.body = "Body is required";
  } else if (values.body.trim().length < 10) {
    errors.body = "Body must be at least 10 characters";
  }

  if (values.userId === null) {
    errors.userId = "Please select an author";
  }

  return errors;
}

export default function PostForm({
  initialValues,
  onSubmit,
  isPending,
  submitLabel,
  onCancel,
}: PostFormProps) {
  const { data: users, isLoading: usersLoading, error: usersError } = useUsers();

  const [values, setValues] = useState<FormValues>({
    title: initialValues?.title ?? "",
    body: initialValues?.body ?? "",
    userId: initialValues?.userId ?? null,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    title: false,
    body: false,
    userId: false,
  });

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const newValues = { ...values, [field]: value };
      const newErrors = validate(newValues);
      setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    }
  }

  function handleUserChange(userId: number) {
    setValues((prev) => ({ ...prev, userId }));
    setTouched((prev) => ({ ...prev, userId: true }));
    setErrors((prev) => ({ ...prev, userId: undefined }));
  }

  function handleBlur(field: keyof FormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validate(values);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched({ title: true, body: true, userId: true });
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSubmit({
      title: values.title.trim(),
      body: values.body.trim(),
      userId: values.userId!,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Post form"
      className="flex flex-col gap-6"
    >
      <Input
        label="Title"
        required
        value={values.title}
        onChange={(e) => handleChange("title", e.target.value)}
        onBlur={() => handleBlur("title")}
        error={touched.title ? errors.title : undefined}
        placeholder="Enter a compelling title…"
        maxLength={150}
        hint={`${values.title.length}/150 characters`}
      />

      <Textarea
        label="Content"
        required
        value={values.body}
        onChange={(e) => handleChange("body", e.target.value)}
        onBlur={() => handleBlur("body")}
        error={touched.body ? errors.body : undefined}
        placeholder="Write your post content here…"
        rows={8}
      />

      <UserSelect
        users={users}
        isLoading={usersLoading}
        error={usersError}
        value={values.userId}
        onChange={handleUserChange}
        onBlur={() => handleBlur("userId")}
        errorMessage={touched.userId ? errors.userId : undefined}
        required
      />

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={isPending} disabled={isPending}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
