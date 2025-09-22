
class TechTest {
    baseUrl: string;
    page: any;

    constructor(baseUrl: string, page: any) {
        this.baseUrl = baseUrl;
        this.page = page;
    }

    async goto(path: string) {
        await this.page.goto(this.baseUrl + path);
    }

    async getByRole(role: string, options?: any) {
        return await this.page.getByRole(role, options);
    }

    async getByLabel(label: string, options?: any) {
        return await this.page.getByLabel(label, options);
    }

    async getByPlaceholder(placeholder: string, options?: any) {
        return await this.page.getByPlaceholder(placeholder, options);
    }

    async getByText(text: string, options?: any) {
        return await this.page.getByText(text, options);
    }

    async getByTestId(testId: string) {
        return await this.page.getByTestId(testId);
    }

    async getByTitle(title: string, options?: any) {
        return await this.page.getByTitle(title, options);
    }

    async getByAltText(altText: string, options: any) {
        return await this.page.getByAltText(altText, options);
    }

    async selectinterestRate(interestRate: string) {
        const getStartedLink = await this.getByRole('button', { name: 'Select Interest Rate' });
        await getStartedLink.click();
        const interestValueCheckbox = await this.getByRole('checkbox', { name: `${interestRate}` });
        await interestValueCheckbox.check();
        await this.page.locator('body').click();
    }

    async login(username: string, password: string) {
        const initialLoginButton = await this.getByRole('button', { name: 'Login' });
        await initialLoginButton.click();
        const usernameField = await this.getByRole('textbox', { name: 'Email' });
        await usernameField.fill(username);
        const passwordField = await this.getByRole('textbox', { name: 'password' });
        await passwordField.fill(password);
        const loginButton = await this.getByRole('button', { id: 'login_submit' });
        await loginButton.click();
    }
}

export { TechTest };