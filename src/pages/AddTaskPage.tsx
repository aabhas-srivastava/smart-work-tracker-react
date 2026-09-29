import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { taskSchema } from "../validation/taskSchema";
import type { Task, TaskStatus, TaskPriority } from "../types/task";
import Header from "../components/Header";

interface AddTaskPageProps {
  existingIds: number[];
  onAdd: (task: Task) => void;
}

export default function AddTaskPage({ existingIds, onAdd }: AddTaskPageProps) {
  const navigate = useNavigate();

  const initialValues = {
    id: "",
    title: "",
    status: "",
    priority: "",
    tags: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    const numId = Number(values.id);

    if (existingIds.includes(numId)) {
      alert("ID already exists.");
      return;
    }

    const newTask: Task = {
      id: numId,
      title: values.title.trim(),
      status: values.status as TaskStatus,
      priority: values.priority as TaskPriority,
      tags: values.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    onAdd(newTask);
    navigate("/");
  };

  return (
    <div className="container">
      <Header />

      <section className="add-task">
        <h2>Add New Task</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={taskSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-row">
                <div>
                  <Field type="number" name="id" placeholder="Task ID" />
                  <ErrorMessage name="id" component="div" className="error" />
                </div>

                <div>
                  <Field type="text" name="title" placeholder="Title" />
                  <ErrorMessage name="title" component="div" className="error" />
                </div>
              </div>

              <div className="form-row">
                <div>
                  <Field as="select" name="status">
                    <option value="">Select Status</option>
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="error" />
                </div>

                <div>
                  <Field as="select" name="priority">
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </Field>
                  <ErrorMessage name="priority" component="div" className="error" />
                </div>

                <div>
                  <Field
                    type="text"
                    name="tags"
                    placeholder="Tags (comma separated)"
                  />
                  <ErrorMessage name="tags" component="div" className="error" />
                </div>
              </div>

              <button type="submit" className="btn btn-add" disabled={isSubmitting}>
                Add Task
              </button>

              <Link to="/" style={{ marginLeft: "12px" }}>
                Cancel
              </Link>
            </Form>
          )}
        </Formik>
      </section>
    </div>
  );
}