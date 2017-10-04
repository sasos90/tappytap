import {} from 'jasmine';
import { browser, element, by, ElementFinder } from 'protractor';

describe('Try to play the game', () => {

    beforeEach(() => {
        console.log('BEFORE EACH');
    });

    it('should do', () => {
        browser.get('/');
        browser.driver.sleep(1000);
        expect(true).toBe(true);
    });
});
