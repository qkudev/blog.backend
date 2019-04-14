import server from './server'
import { port } from './utils/env'

import './utils/mongo'

server.listen(port, () => {
  console.log(`Server is on port ${port}`)
})
