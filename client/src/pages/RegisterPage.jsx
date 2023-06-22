import { useForm } from "react-hook-form"
import { registerRequest } from "../api/auth"

export default function RegisterPage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = handleSubmit(async (values) => {
    const res = await registerRequest(values)
    console.log(res)
  })

  return (
    <div className="bg-zinc-800 max-w-md p-10 rounded-md my-2">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("username", { required: true })}
          placeholder="username"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 "
        />
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="email"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 "
        />
        <input
          type="password"
          {...register("password", { required: true })}
          placeholder="password"
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
