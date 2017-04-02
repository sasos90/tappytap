/**
 * Created by saso on 4/2/17.
 */
import { Injectable } from "@angular/core";
import {NativeAudio} from "ionic-native";
import {LocalStorage} from "./LocalStorage";
import {LSK} from "../models/LSK";

@Injectable()
export class Sound {

    public static play(name: string) : void {
        if (LocalStorage.get(LSK.SOUND) === true) {
            NativeAudio.play(name);
        }
    }

    public static load(name: string, pathToAsset: string) {
        if (LocalStorage.get(LSK.SOUND) === true) {
            NativeAudio.preloadSimple(name, pathToAsset);
        }
    }
}
