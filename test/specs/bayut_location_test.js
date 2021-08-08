describe('Bayut product search', () => {
    it('Should open the Bayut url and verify the title', () => {
        browser.maximizeWindow()
        browser.url('https://www.bayut.com/');
        expect(browser).toHaveTitle("Bayut: UAE's Largest Real Estate Portal");
    });
    it('Verify that all displayed properties contain the selected location', () => {
        // TODO: Change all the long selectors into shorter, readable ones like the selectors from below -line 28
        const searchInput = $('._4610598b input');
        const searchSelect = $('#body-wrapper > header > div.dcdcdd28 > div > div._301c117f > div > div._580fbeeb._87de3797 > div.ad62c515.a544e6c5._4a6228f4 > div > div > div > ul > li:nth-child(1)');
        const searchButton = $('div._580fbeeb._8a6c9954 a');
        const purposeDropdown = $('#body-wrapper > header > div.dcdcdd28 > div > div._301c117f > div > div._580fbeeb._87de3797 > div.ad62c515._325092f0._4a6228f4 > div > div > svg');
        const selectPurpose = $('#body-wrapper > header > div.dcdcdd28 > div > div._301c117f > div > div._580fbeeb._87de3797 > div.ad62c515._325092f0._4a6228f4 > div > div._0a772a68 > div > div:nth-child(1) > div > span:nth-child(1) > button');
        searchInput.addValue('Dubai Marina');
        browser.pause(1000);
        searchSelect.click();
        purposeDropdown.click();
        selectPurpose.click();
        searchButton.click();
        const maybeLaterButton = $('#body-wrapper > div > div > div > div.fc2cf491 > button:nth-child(2)');
        if (maybeLaterButton.isDisplayed()) {
            maybeLaterButton.click();
        }
        const nextPage = $('div[title="Next"]');
        browser.pause(2000);
        do {
            browser.pause(2000);
            const propertiesList = $$('._7afabd84'); // double arrow finds all the elements in page
            propertiesList.forEach(element => {
                expect(element).toHaveTextContaining("Dubai Marina");
                console.log("*****"); // TODO: remember to remove all the debugging logs, including my comments
            });
            if (nextPage.isDisplayed()) {
                nextPage.click();
            }
            browser.pause(2000);
        } while (nextPage.isDisplayed())
        browser.pause(10000);

    })
});
