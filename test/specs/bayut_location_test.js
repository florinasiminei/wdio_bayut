describe('Bayut product search', () => {
    it('Should open the Bayut url and verify the title', () => {
        browser.maximizeWindow()
        browser.url('https://www.bayut.com/');
        expect(browser).toHaveTitle("Bayut: UAE's Largest Real Estate Portal");
    });
    it('Should verify that all displayed properties contain the selected location', () => {
        const searchInput = $('._4610598b input');
        const searchSelect = $('._3eb9be10._9a03d150 li:nth-child(1) button');
        const searchButton = $('div._580fbeeb._8a6c9954 a');
        const purposeDropdown = $('._325092f0 .ef5cccac');
        const selectPurpose = $('div .d92d11c7:nth-child(1) button');
        searchInput.addValue('Dubai Marina');
        browser.pause(1000);
        searchSelect.click();
        purposeDropdown.click();
        selectPurpose.click();
        searchButton.click();
        const maybeLaterButton = $('.fc2cf491 button:nth-child(2)');
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
            });
            if (nextPage.isDisplayed()) {
                nextPage.click();
            }
            browser.pause(2000);
        } while (nextPage.isDisplayed())
        browser.pause(10000);

    })
});
