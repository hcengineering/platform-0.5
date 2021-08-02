import builder from '.'
import { writeFileSync } from 'fs'

const content = JSON.stringify(builder.getTxes(), undefined, 2)
writeFileSync('../../plugins/client-dev/src/model.tx.json', content)

