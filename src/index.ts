/// <reference path="typings.d.ts" />

import server from './server'
import { port } from './utils/env'

// mongoose configuration
import './utils/mongo'

server.listen(port, () => {
  console.log(`Server is on port ${port}`)
})
