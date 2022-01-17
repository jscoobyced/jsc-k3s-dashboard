import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Node: NextPage = () => {
  const router = useRouter()
  const { nodeId } = router.query
  return (
    <main>
      Node: {nodeId}
    </main>
    
  )
}


export default Node
