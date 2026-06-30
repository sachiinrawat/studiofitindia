### Problem

Whenever I make changes to the website, I update the theme folder and upload it to the server.

After that, I also clear the Hostinger cache. However, users who have already opened the website continue to see the old version until they manually refresh the page.

This recently caused a problem:

* A customer first saw the membership price as **₹1,699**.
* We followed up with the customer for about a week.
* Meanwhile, I updated the website price to **₹3,500**.
* When our RM told the customer the new price, the customer said, "I'll check your website."
* Since the customer already had the website open, it still showed **₹1,699** because the page had not been refreshed.
* The RM asked the customer to refresh the page.
* The customer then said, "No, you're trying to increase the price after asking me to refresh. This looks like fraud."
* As a result, we lost the sale because of a trust issue.

### My Idea

I was thinking of automatically refreshing the website so users always see the latest version.

For example:

* If a browser tab is inactive for more than 1 minute, the website should automatically reload when the user comes back.
* Or, whenever a user revisits the website, it should automatically check for a newer version and refresh itself if the website has been updated.
* This way, users will always see the latest pricing and content without manually refreshing the page.
