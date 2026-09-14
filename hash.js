import bcypt from 'bcrypt'

const hash = await bcypt.hash('12345678', 10)

console.log(hash)