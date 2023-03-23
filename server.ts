import * as express from 'express';

const PORT = process.env.PORT || 8080;

const app = express()

app.use('/', express.static('./dist'))

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
