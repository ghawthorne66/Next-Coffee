import { useRouter } from "next/router"
import Link from "next/link"
import Head from "next/head"

const DynamicRoute = () => {
  const router = useRouter()
  const query = router.query.dynamic
  return (
    <div>
      <Head>
        <title>{query}</title>
      </Head>
      <div>Dynamic Route</div>
      <p>pageProps {query}</p>
      <Link href="/courses/nextjs">
        <a>Next Js</a>
      </Link>
    </div>
  )
}

export default DynamicRoute
