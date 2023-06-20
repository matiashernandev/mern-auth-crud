import { Router } from "express"
import { authRequired } from "../middlewares/validateToken.js"

const router = Router()

router.get("/tasks", authRequired, (req, res) => {
  return res.send("tasks")
})

export default router
