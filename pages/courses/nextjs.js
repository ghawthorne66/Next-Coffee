import { useRouter } from "next/router"
import Link from "next/link"

const nextjs = () => {
    const router = useRouter()
  return <div>Welcome to Next.js {router.query.id}</div>
}

export default nextjs
