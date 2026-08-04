import { expect, test } from "../fixtures/baseTest";


test("TC7: Verify Test cases page", async ({homePage, testCases}) => {
    await test.step("Navigate to Landing Page", async () => {
                await homePage.gotoHome();
                await expect(homePage.logoAltText).toBeVisible();
            });

    await test.step("Go to test cases page and verify tests exists", async () => {
        await homePage.clickTestCases();
        await expect(testCases.tcHeading).toHaveText("Test Cases");
        await expect(testCases.tcAll.first()).toBeVisible();
    })
})