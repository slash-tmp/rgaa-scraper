const { scrapeRgaa } = require('@slash-tmp/rgaa-scraper')
const app = require('express')()
const port = 3000

app.get('/', (_, res) => {
  res.send('Hello world')
})

app.get('/topics', (_, res) => {
  const search = req.query.search
  scrapeRgaa().then(rgaa => {
    res.send(rgaa.topics({ search }))
  })
})

app.get('/topics/:id', (req, res) => {
  const { id } = req.params
  scrapeRgaa().then(rgaa => {
    const topic = rgaa.topics({ topic: id })[0]
    if (topic) {
      res.send(topic)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/criteria', (_, res) => {
  const search = req.query.search
  scrapeRgaa().then(rgaa => {
    res.send(rgaa.criteria({ search }))
  })
})

app.get('/criteria/:id', (req, res) => {
  const { id } = req.params
  scrapeRgaa().then(rgaa => {
    const criterion = rgaa.criteria({ criterion: id })[0]
    if (criterion) {
      res.send(criterion)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('/tests', (req, res) => {
  const search = req.query.search
  scrapeRgaa().then(rgaa => {
    res.send(rgaa.tests({ search }))
  })
})

app.get('/tests/:id', (req, res) => {
  const { id } = req.params
  scrapeRgaa().then(rgaa => {
    const test = rgaa.tests().find(t => t.id === id)
    if (test) {
      res.send(test)
    } else {
      res.sendStatus(404)
    }
  })
})

app.get('*', (_, res) => {
  res.sendStatus(404)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
