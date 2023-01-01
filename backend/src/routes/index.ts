import { Router, Request, Response } from "express";
import auth from "./auth";


const routes = Router();

routes.use("/auth", auth);
routes.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });
routes.post('*', (req: Request, res: Response) => {
    res.sendStatus(404);
  });
routes.get('*', (req: Request, res: Response) => {
    res.sendStatus(404);
  });


export default routes;