import express, { Express } from 'express';
import cors from 'cors';
import routes from './routes';

class Application {
    express: Express;

    constructor() {
        this.express = express();
        this.middlewares();
        this.client();
        this.routes();
    }

    middlewares() {
        this.express.use(
            cors({ credentials: true, origin: 'http://localhost:8080' }),
        );
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
    }

    routes() {
        this.express.use(routes);
    }

    client() {
        this.express.get('/', (_request, response) => {
            response.json({
                App: 'Training Project',
                Status: 'Develop',
                Author: 'Gabriel Melo',
                // Docs: link_do_swagger,
            });
        });
    }
}

const app = new Application().express;

export { app };
