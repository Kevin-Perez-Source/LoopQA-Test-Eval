class BoardPage {
    constructor(page) {
        this.page = page;
        this.headingSelector = 'h2'; // Fixed: just h2 elements, no role attribute
        this.cardContainer = '.card, [class*="card"]';
        this.cardTitle = 'h3, .card-title, [class*="title"]';
        this.cardStatus = 'div.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4'; // More specific card container
        this.cardTag = 'div.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4'; // More specific card container
        this.boardContainer = 'div.inline-flex.gap-6.p-6.h-full';
        this.currentBoard = null; // Track which board we're currently on
    }

    async navigateToWebApplication() {
        await this.page.locator(this.headingSelector).filter({ hasText: 'Web Application' }).click();
        await this.page.waitForSelector(this.boardContainer);
        this.currentBoard = 'Web Application';
    }

    async navigateToMobileApplication() {
        await this.page.locator(this.headingSelector).filter({ hasText: 'Mobile Application' }).click();
        await this.page.waitForSelector(this.boardContainer);
        this.currentBoard = 'Mobile Application';
    }

    async navigateToMarketingCampaign() {
        await this.page.locator(this.headingSelector).filter({ hasText: 'Marketing Campaign' }).click();
        await this.page.waitForSelector(this.boardContainer);
        this.currentBoard = 'Marketing Campaign';
    }

    async getCardTitles() {
        return await this.page.locator(this.cardTitle).allTextContents();
    }

    async getCardStatuses() {
        return await this.page.locator(this.cardStatus).allTextContents();
    }

    async getCardTags() {
        return await this.page.locator(this.cardTag).allTextContents();
    }

    async verifyCardExists(title, status, tags) {
        // Look for a card container that contains all the required information
        const cardSelector = 'div.flex.flex-col.w-80.bg-gray-50.rounded-lg.p-4';
        
        // Check if there's a card that contains the title
        const titleExists = await this.page.locator(cardSelector).filter({ hasText: title }).count() > 0;
        
        // Check if there's a card that contains the status
        const statusExists = await this.page.locator(cardSelector).filter({ hasText: status }).count() > 0;
        
        // Check if all tags are present in the same card
        let allTagsPresent = true;
        if (Array.isArray(tags)) {
            for (const tag of tags) {
                const tagVisible = await this.page.locator(cardSelector).filter({ hasText: tag }).count() > 0;
                if (!tagVisible) {
                    allTagsPresent = false;
                    break;
                }
            }
        } else {
            allTagsPresent = await this.page.locator(cardSelector).filter({ hasText: tags }).count() > 0;
        }
        
        return titleExists && statusExists && allTagsPresent;
    }

    async getCurrentBoardName() {
        // Return the board we're currently on
        return this.currentBoard;
    }
}

module.exports = BoardPage;
