import { Passage } from '@passageidentity/passage-js'

const passage = new Passage(import.meta.env.VITE_PASSAGE_KEY)
const session = passage.getCurrentSession()

export { passage, session }
