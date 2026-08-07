import { test as base } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { SignUpLoginPage } from "../pages/signUpLoginPage";
import { SignupPage } from "../pages/signupPage";
import { AccountProcessingPage } from "../pages/accountProcessingPage";
import { ContactUs } from "../pages/contactUsPage";
import { TestCases } from "../pages/testCasesPage";
import { Products } from "../pages/productsPage";
import { ProductDetails } from "../pages/productDetailsPage";
import { Footer } from "../pages/footer";



type MyFixtures= {
    homePage: HomePage;
    signUpLoginPage: SignUpLoginPage;
    signupPage: SignupPage;
    accountProcessingPage: AccountProcessingPage;
    contactUsPage: ContactUs;
    testCases: TestCases;
    products: Products;
    productDetails: ProductDetails;
    footer: Footer;
};

export const test = base.extend<MyFixtures>({
    // Auto-apply page routing to block ads on every test
  page: async ({ page }, use) => {
    await page.route('**/*', async (route, request) => {
      const url = request.url();
      if (
        url.includes('google-analytics') ||
        url.includes('googlesyndication') ||
        url.includes('googleads') ||
        url.includes('pagead') ||
        url.includes('doubleclick') ||
        url.includes('adservice') ||
        url.includes('amazon-adsystem')
      ) {
        await route.abort();
      } else {
        await route.continue();
      }
    });

    await use(page);
  },
    homePage: async ({ page }, use) => { await use(new HomePage(page));},
    signUpLoginPage: async ({page}, use) => {await use(new SignUpLoginPage(page));},
    signupPage: async ({page}, use) => {await use(new SignupPage(page));},
    accountProcessingPage: async ({page}, use) => {await use(new AccountProcessingPage(page));},
    contactUsPage: async ({page}, use) => {await use(new ContactUs(page));},
    testCases: async ({page}, use) => {await use(new TestCases(page));},
    products: async ({page}, use) => {await use(new Products(page));},
    productDetails: async ({page}, use) => {await use(new ProductDetails(page));},
    footer: async ({page}, use) => {await use(new Footer(page));}
})

export {expect} from "@playwright/test";