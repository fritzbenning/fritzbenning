import base64 from 'base-64'
import Status from 'http-status-codes'
import { cipher } from '../../utils/cipher'

// GET -> http://localhost:3000/api/hello-world?email=mail@fritzbenning.de

export default async (request, response) => {
  if (request.method !== 'GET') {
    return response.status(Status.BAD_REQUEST).send('')
  }

  const listId = 13038
  const email = request?.query?.email ?? ''

  const username = process.env.MAILJET_API_KEY
  const password = process.env.MAILJET_PASSWORD

  const myCipher = cipher(process.env.MAILJET_PASSWORD)
  const encryptedMail = myCipher(email)

  let status: any

  const url = `http://fritzbenning.de/newsletter/opt-in?key=${encryptedMail}`

  const body = {
    FromEmail: 'newsletter@fritzbenning.de',
    FromName: 'Fritz Benning',
    Recipients: [
      {
        Email: email
      }
    ],
    To: email,
    Subject: 'Bestätige deine Newsletter-Anmeldung!',
    'HTML-part': `<html><body><h2>Hey! Vielen Dank, für dein Interesse 👋<h2><p>Unter folgendem Link kannst du deine Anmeldung zum Newsletter abschließen:</p><p><a href=${url}>Jetzt Anmeldung bestätigen</a><br /><i><a href=${url}>(${url})</a></i></p><p><strong>Viele Grüße</strong>,<br />Fritz</p></body></html>`
  }

  await fetch('https://api.mailjet.com/v3/send', {
    method: 'POST',
    headers: new Headers({
      Authorization: `Basic ${base64.encode(`${username}:${password}`)}`,
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(body)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      status = data['Sent'][0]['Email'] ? 'success' : 'error'
    })

  return response.json({
    test: 'test'
  })
}
