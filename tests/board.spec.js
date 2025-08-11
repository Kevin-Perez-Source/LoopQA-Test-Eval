const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const BoardPage = require('../pages/boardPage');
const testData = require('../data/cards.json');

// Load environment variables
require('dotenv').config();

test.describe('Board Application Tests', () => {
    let loginPage;
    let boardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        boardPage = new BoardPage(page);
        
        // Navigate to login page
        await loginPage.navigate();
        // Input Username and Password
        await loginPage.login(process.env.LOGIN_USERNAME, process.env.LOGIN_PASSWORD);
        
    });

    test('should successfully login and navigate to board', async ({ page }) => {
        // Verify we're on the projects page (which means login was successful)
        await expect(page.locator('h1.text-lg.font-semibold')).toContainText('Projects');
    });

    test.describe('Web Application Board', () => {
        test('should display correct cards on Web Application board', async ({ page }) => {
            // Navigate to Web Application tab
            await boardPage.navigateToWebApplication();
            
            // Verify board name
            const boardName = await boardPage.getCurrentBoardName();
            expect(boardName).toContain('Web Application');
            
            // Verify each expected card exists
            for (const card of testData.webApplication) {
                const cardExists = await boardPage.verifyCardExists(
                    card.title, 
                    card.status, 
                    card.tag
                );
                expect(cardExists).toBeTruthy();
            }
        });
    });

    test.describe('Mobile Application Board', () => {
        test('should display correct cards on Mobile Application board', async ({ page }) => {
            // Navigate to Mobile Application tab
            await boardPage.navigateToMobileApplication();
            
            // Verify board name
            const boardName = await boardPage.getCurrentBoardName();
            expect(boardName).toContain('Mobile Application');
            
            // Verify each expected card exists
            for (const card of testData.mobileApplication) {
                const cardExists = await boardPage.verifyCardExists(
                    card.title, 
                    card.status, 
                    card.tag
                );
                expect(cardExists).toBeTruthy();
            }
        });
    });

    test.describe('Marketing Campaign Board', () => {
        test('should display correct cards on Marketing Campaign board', async ({ page }) => {
            // Navigate to Marketing Campaign tab
            await boardPage.navigateToMarketingCampaign();
            
            // Verify board name
            const boardName = await boardPage.getCurrentBoardName();
            expect(boardName).toContain('Marketing Campaign');
            
            // Verify each expected card exists
            for (const card of testData.marketingCampaign) {
                const cardExists = await boardPage.verifyCardExists(
                    card.title, 
                    card.status, 
                    card.tag
                );
                expect(cardExists).toBeTruthy();
            }
        });
    });

    test('should navigate between all boards successfully', async ({ page }) => {
        // Test navigation to Web Application
        await boardPage.navigateToWebApplication();
        let boardName = await boardPage.getCurrentBoardName();
        expect(boardName).toContain('Web Application');
        
        // Test navigation to Mobile Application
        await boardPage.navigateToMobileApplication();
        boardName = await boardPage.getCurrentBoardName();
        expect(boardName).toContain('Mobile Application');
        
        // Test navigation to Marketing Campaign
        await boardPage.navigateToMarketingCampaign();
        boardName = await boardPage.getCurrentBoardName();
        expect(boardName).toContain('Marketing Campaign');
    });
});
