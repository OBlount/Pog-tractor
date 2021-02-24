import { Application } from "express";

export default(server: Application) => {
    server.get('/', (req, res) => {
        res.send('HELLO WORLD');
    })

    server.post('/test', (req, res) => {
        res.send({
            message: `Test hit! | ${req.body.Data}`
        })
    })
}