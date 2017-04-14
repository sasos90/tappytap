import {Environment} from "../models/Environment";
/**
 * Created by saso on 4/3/17.
 */
export class Config {
    public static ENV: Environment = Environment.DEVELOP;
    public static VERSION: string = "1.1.0";
    public static BACKEND_HOST: string = Config.ENV === Environment.DEVELOP ? "http://localhost:3000/" : "https://tappytap-backend.sasosabotin.si/";
    public static SALT: string = "*k9[unD1LrQSQ2_";
}
