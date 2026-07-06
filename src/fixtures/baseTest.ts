import { test as base } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { SignUpLoginPage } from "../pages/signUpLoginPage";
import { SignupPage } from "../pages/signupPage";
import { AccountProcessingPage } from "../pages/accountProcessingPage";



type MyFixtures= {
    homePage: HomePage;
    signUpLoginPage: SignUpLoginPage;
    signupPage: SignupPage;
    accountProcessingPage: AccountProcessingPage;
};

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => { await use(new HomePage(page));},
    signUpLoginPage: async ({page}, use) => {await use(new SignUpLoginPage(page));},
    signupPage: async ({page}, use) => {await use(new SignupPage(page));},
    accountProcessingPage: async ({page}, use) => {await use(new AccountProcessingPage(page));}
})

export {expect} from "@playwright/test";