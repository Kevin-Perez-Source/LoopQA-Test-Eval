class LoginPage {
    constructor(page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto(process.env.BASE_URL);
    }

    async login(username, password) {
        await this.page.getByRole('textbox', { name: 'Username' }).fill(username);
        await this.page.getByRole('textbox', { name: 'Password' }).fill(password);
        await this.page.getByRole('button', { name: 'Sign in' }).click();
    }

    async getErrorMessage() {
        return await this.page.locator('.text-red-500.text-sm').textContent();
    }

    async isLoggedIn() {
        // Check if login form is still visible
        try {
            const usernameVisible = await this.page.getByRole('textbox', { name: 'Username' }).isVisible();
            const passwordVisible = await this.page.getByRole('textbox', { name: 'Password' }).isVisible();
            
            // If login form is not visible, we're likely logged in
            return !(usernameVisible && passwordVisible);
        } catch (error) {
            // If we can't find login elements, we're probably logged in
            return true;
        }
    }


}

module.exports = LoginPage;
