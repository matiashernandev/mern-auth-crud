import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import { Button, Card, Input, Label } from "../components/ui"

import { Textarea } from "../components/ui/Textarea"
import { useForm } from "react-hook-form"
import { useTasks } from "../context/TasksContext"
dayjs.extend(utc)

export default function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks()
  const navigate = useNavigate()
  const params = useParams()
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    }

    try {
      if (params.id) {
        updateTask(params.id, dataValid)
      } else {
        createTask(dataValid)
      }

      navigate("/tasks")
    } catch (error) {
      console.log(error)
      navigate("/")
    }
  }

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id)
        setValue("title", task.title)
        setValue("description", task.description)
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        )
        setValue("completed", task.completed)
      }
    }
    loadTask()
  }, [])

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            name="title"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">Please enter a title.</p>
          )}

          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            id="description"
            rows="3"
            placeholder="Description"
            {...register("description")}
          ></Textarea>

          <Label htmlFor="date">Date</Label>
          <Input type="date" name="date" {...register("date")} />
          <Button>Save</Button>
        </form>
      </Card>
    </div>
  )
}
