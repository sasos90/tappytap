import {Environment} from "../models/Environment";
/**
 * Created by saso on 4/3/17.
 */
export class Config {
    public static ENV: Environment = Environment.DEVELOP;
    public static VERSION: string = "1.0.0";
    public static BACKEND_HOST: string = "BACKEND_HOST/";
    public static SALT: string = "SALT_NEEDS_TO_BE_CREATED";
}
