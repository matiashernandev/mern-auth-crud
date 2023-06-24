import { useForm } from "react-hook-form"
import { useTasks } from "../context/TasksContext"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect } from "react"

export default function TaskFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  const { createTask, updateTask, getTask } = useTasks()
  const navigate = useNavigate()

  const params = useParams()

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id)

        setValue("title", task.title)
        setValue("description", task.description)
      }
    }
    loadTask()
  }, [])

  const onSubmit = handleSubmit(async (values) => {
    if (params.id) {
      updateTask(params.id, values)
    } else {
      createTask(values)
    }
    navigate("/tasks")
  })
  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit}>
        <input
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("title", { required: true })}
          type="text"
          placeholder="Title"
          autoFocus
        />
        {errors.title && <p className="text-red-500 ">Username is required</p>}
        <textarea
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          {...register("description", { required: true })}
          rows="3"
          placeholder="Description"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 ">Username is required</p>
        )}
        <button>Save</button>
      </form>
    </div>
  )
}
