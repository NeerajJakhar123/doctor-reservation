// run the server
const app = require('./app');

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`App is running at ${port}`)
  })

/*app.listen(app.get('port'),
  // eslint-disable-next-line no-console
  () => console.log(`server run on http://localhost:${app.get('port')}`)); */