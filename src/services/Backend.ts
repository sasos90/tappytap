import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Config} from "./Config";
import {Device} from "@ionic-native/device";
import {IScoreRequest} from "../models/IScoreRequest";
import {ScoreModel} from "../models/ScoreModel";
/**
 * Created by saso on 4/5/17.
 */
@Injectable()
export class Backend {

    constructor(
        public device: Device,
        public http: Http
    ) {}

    public sendScore(score: ScoreModel, successCb: (rank: number) => any, errorCb: () => any) {

        let date = new Date();
        let request: IScoreRequest = {
            time: Math.round(date.getTime() / 1000),
            score: score.total,
            level: score.levelReached,
            deviceUuid: this.device.uuid,
            hash: "HASH_FROM_INPUTS_WITH_SALT_FROM_CONFIG"
        };
        // Config.SALT
        console.log("Request:", request);

        setTimeout(() => {
            successCb(1983);
        }, 1500);
        /*this.http.post(Config.BACKEND_HOST + "requestname", {
            score: 1337
        }).subscribe((response) => {
            // next
        }, (response) => {
            // error
        }, () => {
            // complete
        });*/
    }
}
