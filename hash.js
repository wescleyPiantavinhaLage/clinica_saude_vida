import bcypt from 'bcrypt'

const hash = await bcypt.hash('12345678', 10)

const valido = await bcypt.compare('12345678','$2b$10$C5kYG/BL1uFzTlw2XS51/O1N1aVAjBIWtP4cMsYYpYSisFjS9/fwe')

console.log(valido)