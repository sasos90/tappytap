import {Environment} from "../models/Environment";
/**
 * Created by saso on 4/3/17.
 */
export class Config {
    public static ENV: Environment = Environment.DEVELOP;
    public static VERSION: string = "1.0.0";
    public static BACKEND_HOST: string = "http://localhost:3000/";
    public static SALT: string = "*k9[unD1LrQSQ2_";
}
