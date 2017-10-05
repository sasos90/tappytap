import { protractor, browser, $, $$, element, by, ElementFinder } from 'protractor';

export class GameObject {

    navigateToRoot() {
        return browser.get('');
    }

    startGame() {
        const startGameButton = this.getStartGameButton();
        this.getStartGameButton().click();
    }

    getStartGameButton() {
        return $('#start-game');
    }

    getFinalResultWrapper() {
        return $('.level-complete-wrapper');
    }

    playTheGame() {
        const goalWrapper = $('#goal-wrapper');
        $('#goal-wrapper').getSize().then((size) => {
            console.log(size);
        });
    }
}
