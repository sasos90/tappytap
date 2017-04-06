import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Config} from "./Config";
/**
 * Created by saso on 4/5/17.
 */
@Injectable()
export class Backend {

    constructor(
        public http: Http
    ) {}

    public sendScore() {

        this.http.post(Config.BACKEND_HOST + "requestname", {
            score: 1337
        }).subscribe((response) => {
            // next
        }, (response) => {
            // error
        }, () => {
            // complete
        });
    }
}
