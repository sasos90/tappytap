import {} from 'jasmine';
import { browser, element, by, ElementFinder, protractor } from 'protractor';
import {GameObject} from "./GameObject";

describe('Try to play the game', () => {

    let game: GameObject;

    beforeEach(() => {
        browser.restartSync();
        browser.ignoreSynchronization = true;
        browser.waitForAngularEnabled(true);
        game = new GameObject();
    });

    it('should start the game', () => {
        game.navigateToRoot();
        game.startGame();
        // game.playTheGame();
        // const until = protractor.ExpectedConditions;
        // browser.wait(until.presenceOf(game.getFinalResultWrapper()), 5000, 'Element taking too long to appear in the DOM');
    });
});
