import { GeneralPage } from '../../pages/layouts/GeneralPage';

export class MyAccountPage extends GeneralPage {
    private readonly usernameInput = this.page.getByRole('textbox', { name: 'Username or email address' });
    private readonly passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    private readonly loginButton = this.page.getByRole('button', { name: 'Log in' });

    public async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public async isLoginPageDisplayed(): Promise<boolean>{
        const [result1, result2, result3] = await Promise.all([
            this.usernameInput.isVisible(),
            this.passwordInput.isVisible(),
            this.loginButton.isVisible()
        ])
        return  result1 && result2 && result3;
    }
}