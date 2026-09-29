import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";
import { taskSchema } from "../validation/taskSchema";
import type { Task, TaskStatus, TaskPriority } from "../types/task";
import Header from "../components/Header";

interface EditTaskPageProps {
  tasks: Task[];
  onUpdate: (task: Task) => void;
}

export default function EditTaskPage({ tasks, onUpdate }: EditTaskPageProps) {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const taskId = Number(id);
  const existingTask = tasks.find((t) => t.id === taskId);

  if (!existingTask) {
    return (
      <div className="container">
        <Header />
        <p>Task not found.</p>
        <Link to="/">← Back to Home</Link>
      </div>
    );
  }

  const initialValues = {
    id: existingTask.id,
    title: existingTask.title,
    status: existingTask.status,
    priority: existingTask.priority,
    tags: existingTask.tags.join(", "),
  };

  const handleSubmit = (values: typeof initialValues) => {
    const updatedTask: Task = {
      id: existingTask.id,
      title: values.title.trim(),
      status: values.status as TaskStatus,
      priority: values.priority as TaskPriority,
      tags: values.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    onUpdate(updatedTask);
    navigate("/");
  };

  return (
    <div className="container">
      <Header />

      <section className="add-task">
        <h2>Edit Task #{existingTask.id}</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={taskSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form-row">
                <div>
                  <Field type="number" name="id" disabled />
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
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </Field>
                  <ErrorMessage name="status" component="div" className="error" />
                </div>

                <div>
                  <Field as="select" name="priority">
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
                Save Changes
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