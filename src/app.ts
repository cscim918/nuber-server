import cors from "cors";
import { NextFunction,Response } from "express";
import { GraphQLServer } from "graphql-yoga";
import helmet from "helmet";
import logger from "morgan";
import schema from "./schema";
import decodeJWT from './utils/decodeJWT';

class App {
  public app: GraphQLServer;
  constructor() { //App 클래스를 새로 시작할 때마다 호출되는 함수, App 클래스를 어떻게 형성할지 정하는 함수
    this.app = new GraphQLServer({
      schema,
      context: req =>{
        return{
          req: req.request
        };
      }
    });
    this.middlewares();
  }
  private middlewares = (): void => {
    this.app.express.use(cors());
    this.app.express.use(logger("dev"));
    this.app.express.use(helmet());
    this.app.express.use(this.jwt);
  };

  private jwt = async(
    req, 
    res:Response, 
    next: NextFunction
    ): Promise<void> =>{
    const token = req.get("X-JWT");
    if(token){//만약 토큰이 있다면
      const user = await decodeJWT(token);
      if(user){
        req.user = user;
      }else{
        req.user = undefined;
      }
    }
    next();
  };
}

export default new App().app;