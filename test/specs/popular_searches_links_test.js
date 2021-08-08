const {
    executeHooksWithArgs
} = require("@wdio/sync");

describe('Bayut for rent popular searches', () => {
    it('Should Validate links under "Dubai apartments" are functioning correctly (the search page is loaded correctly)', () => {
        browser.maximizeWindow()
        browser.url('https://www.bayut.com/');

        expect(browser).toHaveTitle("Bayut: UAE's Largest Real Estate Portal");

        const ToRentButton = $('._8211eb25 div:nth-child(2)');
        expect(ToRentButton).toHaveTextContaining("To Rent");
        ToRentButton.click();
        browser.pause(2000);

        const sectionsList = $$('._617311a2 ._5a12e6f6._9b01d0a7');

        sectionsList.forEach(element => {
            if (element.getText().includes("Dubai Apartments")) {
                const links = element.$$("._76ddbf32.af2d23c9 a");
                links.forEach(elem => {
                    expect(elem).toHaveAttributeContaining('title', 'Apartments for rent in ');
                    let linkTtext = elem.getAttribute("title");
                    linkTtext = linkTtext.replace("Apartments for rent in ", "").replace("- ", "");

                    href = elem.getAttribute("href");
                    browser.newWindow(href);

                    const handles = browser.getWindowHandles();
                    browser.switchToWindow(handles[1]);

                    const purpose = $('._3a42e70b._1246bfc1 span.ef5cccac');
                    expect(purpose).toHaveTextContaining("Rent");

                    const propertyType = $('._3a42e70b.dec16dfe span.ef5cccac');
                    expect(propertyType).toHaveTextContaining("Apartment");

                    const location = $('._3a42e70b.c7f047fa ._4610598b');
                    // Handle 'Dubai Production City (IMPZ)' vs 'Dubai Production City - IMPZ' edge case
                    let = locationText = location.getText().replace("(", "").replace(")", "");
                    expect(locationText).toContain(linkTtext);

                    browser.closeWindow();
                    browser.switchToWindow(handles[0])
                })
            }

        });

    });
});
