import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs} from "@angular/http";
import {Config} from "./Config";
import {Device} from "@ionic-native/device";
import {IScoreRequest} from "../models/IScoreRequest";
import {ScoreModel} from "../models/ScoreModel";
import {IRankRequest} from "../models/IRankRequest";
/**
 * Created by saso on 4/5/17.
 */
@Injectable()
export class Backend {

    public URL: string = Config.BACKEND_HOST + "rankings/";

    constructor(
        public device: Device,
        public http: Http
    ) {}

    public sendScore(total: number, levelReached: number, successCb: (rank: number) => any, errorCb: () => any) {
        let url = this.URL + "sendScore";
        let date = new Date();
        let request: IScoreRequest = {
            time: Math.round(date.getTime() / 1000),
            score: total,
            level: levelReached,
            deviceUuid: this.device.uuid,
            name: "Name Johnnyyy",
            hash: null
        };
        request.hash = this.createSalt(request);
        // Config.SALT
        console.log("Request:", request);

        this.http.post(url, request).subscribe((response) => {
            // next
            console.log("Next: ", response);
        }, (response) => {
            // error
            console.error(response);
        }, () => {
            // complete
        });

        setTimeout(() => {
            successCb(1983);
        }, 1500);
    }

    public getRank(successCb: (rank: number) => any, errorCb: () => any) {
        let url = this.URL + "getRank";
        let request: IRankRequest = {
            deviceUuid: this.device.uuid
        };

        this.http.post(url, request).subscribe((response) => {
            // next
            console.log("Response: ", response.json());
            let res = response.json();
            successCb(res.rank);
        }, (response) => {
            // error
            console.error(response);
        }, () => {
            // complete
        });
    }

    private createSalt(request: IScoreRequest) : string {
        // TODO use MD5 for that string
        return request.time + request.deviceUuid + request.level + request.name + request.score;
    }
}
