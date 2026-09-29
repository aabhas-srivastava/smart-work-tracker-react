import * as Yup from "yup";

export const taskSchema = Yup.object({
  id: Yup.number()
    .typeError("ID must be a number")
    .required("Task ID is required")
    .positive("ID must be a positive number")
    .integer("ID must be a whole number"),

  title: Yup.string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title is too long"),

  status: Yup.string()
    .oneOf(["Todo", "In Progress", "Completed"], "Invalid status")
    .required("Status is required"),

  priority: Yup.string()
    .oneOf(["High", "Medium", "Low"], "Invalid priority")
    .required("Priority is required"),

  tags: Yup.string()
    .required("At least one tag is required")
    .test(
      "has-tags",
      "Please enter at least one tag",
      (value) => {
        if (!value) return false;
        const tags = value.split(",").map((t) => t.trim()).filter(Boolean);
        return tags.length > 0;
      }
    ),
});