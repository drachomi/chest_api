const cribstockDatasource = require("../datasources/cribstock");
const emailService = require("../services/Email");

async function usernameconflict(test) {
    test = test == 'test' ? 'test' : ''
    let results = usernameConflicters
    const message = `  
    <p>Hello Cribstocker,</p>

    <p>You received this email because of an update on your account.</p>

    <p>Your Cribstock username was optimized during an upgrade.</p>

    <p>Your new username has an extra number "1"</p>

    <p>This means that if your username used to be "dami" all you may need to sign in with is <b>dami1</b></p>
    
    <p>If your username was amaka you need to sign in as <b>amaka1</b> now.</p>

    <p>This change is also effective on your referral links sent already.</p> 
    
    <p>Kindly visit the <b>Overview Page</b> on your account to use your new referral link for future invitations.</p>

    <p>This changes includes your wallet tags too. </p>
    
    <p>What's a wallet tag? Wallet tag is a unique ID that other users on Cribstock can use to send money to you.
    Kindly visit your wallet page to see your new wallet tag.</p>

    <p>Sincere apologies for whatever inconveniences this may have caused you.</p>

    <p>If you desire a different username, kindly reply with your desired username and we shall swap it with this new one (just one time)</p>

    <p>We're happy to have you on Cribstock.</p>
    `
    let length = results.length
    let percycle = 1000
    let cycletogo = Math.ceil(length / percycle)

    for (i = 0; i <= cycletogo; i++) {
        let active_array = results.slice(i * (percycle), (percycle) * (1 + i))
        await emailService.segment(active_array, message, "Change of Username On Your Cribstock Account");
    }
}

async function allusers(test) {
    test = test == 'test' ? 'test' : ''
    const [results, metadata] = await cribstockDatasource.query(`SELECT email, "firstName" FROM users`);
    const message = `  
    <p>Hello Cribstocker,</p>
    <p>Thank you for being patient with us.</p>
    <p>Our services are fully restored now at 12:35pm as opposed to 10:30am (sincere apologies)</p>
    <p>Our system's performances has been improved and now you can easily sign up, login, fund wallet to co-own properties you love.</p>
    <p>To the 16 persons out of thousands of our beloved users who experienced a glitch during the wallet funding process within the last 48hours, we have rectified your wallet issues expeditiously. Kindly check your wallet and revert if otherwise.</p>
    <p>We are investigating every failed funding to ensure they are corrected.</p>
    <p>Cribstock is solving a major problem for Africans!</p>
    <p>Every region has its own unique problems which requires unique solutions and to us in Africa, about 250 million persons who accounts for up to 80% of professionals who work and live here cannot afford to own real estate, and here we are at Cribstock, building to change how real estate should be owned and who can own it.</p>
    <p>Today you can co-own properties you love, in cities you love and enjoy every benefit a landlord would too, starting with $10</p>
    <p>Thank you for believing in us.</p>`
    let length = results.length
    let percycle = 1000
    let cycletogo = Math.ceil(length / percycle)
    for (i = 0; i <= cycletogo; i++) {
        let active_array = results.slice(i * (percycle), (percycle) * (1 + i))
        await emailService.segment(active_array, message, "Next Step - Activate Your Wallet");
    }
}

async function nonuban() {
    const [results, metadata] = await cribstockDatasource.query(`SELECT email, "firstName" FROM users where "id" not in (select "userId" from wallets)`);
    //console.log({results})
    const message = `<p>Hello Cribstocker,</p>
                <p>You took the first step to create an account, don't miss the opportunity to own a wallet which comes with a free bank account in your name.</p>
                <p>This wallet helps you hold and track all transactions you'll make on Cribstock, it's fast, secure simple and beautiful.</p>
                <p>Go to wallet and activate now!</p>`
    let length = results.length
    let percycle = 1000
    let cycletogo = Math.ceil(length / percycle)
    for (i = 0; i <= cycletogo; i++) {
        let active_array = results.slice(i * (percycle), (percycle) * (1 + i))
        await emailService.segment(active_array, message, "Next Step - Activate Your Wallet");
    }

}


async function neverfunded() {
    const [results, metadata] = await cribstockDatasource.query(`SELECT email, "firstName" from users where "id" in (select "userId" from wallets where "updatedAt" = "createdAt")`)
    const message = `<p>Hello Cribstocker,</p>
                <p>To fund your wallet is the next important step to achieve your goals of earning through real estate.</p>
                <p>Login to your account, on the wallet tab, Click Fund Wallet and proceed to send money into the unique bank account found on your wallet.</p>

<h3 style="color: #5df414 ;">How you’ll earn on Cribstock:</h3>

<p>On Cribstock you can invest into stocks of a property which makes you a co-owner of that property.</p>

<p>When you invest into a property, we provide you with the data of the appreciation of the property which helps you to earn a variable daily interest to enable you make money as the property grows in value.</p>

<p>This means that if the property appreciates by 10% in a month, then your share on the property would be worth an extra 10%.</p>

<p>If the property appreciates by 1% then you’ll have 1% growth.</p>

<p>If the property appreciates by 500% then you’ll have 500% growth.</p>

<p>If the property does not appreciate in value then your capital won’t appreciate in value although this is quite rare as Cribstock would do her due diligence to ensure that properties we list are in high growth areas and would be beneficial to users on our platform.</p>

<p>We broke down the appreciation of these properties to enable you earn a daily interest as you invest.</p>

<p>You’ll also earn a share of rental yield on your wallet when the property is rented out.</p>

<h4>Kindly Note:</h4> 

<p>Property is not an asset you would invest into and expect to see great results in one month. You can do that with sport betting but investing in real estate requires time and patience to grow.</p>

<p>If properties grew as rapid as many investors expect then rent would have been 10M per room in average parts of cities like Lagos.</p>

<p>Properties can grow at 10% in a year.</p>

<p>It can also grow at 70% in a year.</p>

<p>It can also grow at 150% in a year.</p>

<p>It all depends on the property market’s performance not the property in most cases.</p>

<p>Real estate is for the long term, your goal should be to continue to acquire more properties stocks to be able to own more in real estate over a period of time. You could decide on a goal to own 3 million Naira worth of property stocks over a specific time period. To actualize it you would continually invest towards reaching that goal. This is the only proven way to earn more cash flow from tenants and to grow more in real estate as properties you invested into continue appreciate in value.</p>

<p>Below is a step by step guide to enable you start using Cribstock.</p>

<h3 style="color: #5df414 ;">
  How Cribstock Works:
</h3>

<p>Cribstock is the easiest way to invest into properties you love with as little as N11,000, N12,000 or N60,000.</p>
  
<p>You can own one or multiple shares of a property also called “stocks” to earn rent from tenants who use the property and also earn a variable daily interest on the investment tied to the appreciation of the property</p>

<h3 style="color: #5df414 ;">
  How to start:
</h3>
<ol>
    <li>Login via cribstock.com</li>
    <li>Setup your wallet secret pin or activate wallet. </li>
    <li>Tap the fund wallet button to reveal your unique account number. </li>
    <li>Send Naira into the unique account number to successfully fund wallet.</li>
</ol>

<h3 style="color: #5df414 ;">
  How to Invest:
</h3>

<ol>
    <li>You need to setup your account and fund wallet. </li>
    <li>On your account, kindly visit the Invest page (the first page). </li>
    <li>Click on a property from the list</li>
    <li>The check price on the property to determine your investment size.</li>
    <li>Scroll inside the property to see the Buy Stock button. </li>
    <li>Click to Buy Stock and choose quantity (you can own multiple stocks). </li>
    <li>Track the growth of your investment anytime through your Portfolio. </li>
</ol>

<p>
  You can diversify by owning shares of more than one property at a time.
</p>

<p>You can own multiple stocks of a property.</p>

<p>The more shares you own a property the more you’ll earn from the property than others who own less shares.</p>

<p>You are not required to pay any monthly fee to keep your ownership on a property.</p>

<p>You can sell you stock which includes the profit and capital anytime by clicking the Buy/Sell button on your portfolio to sell and you’ll have cash ready on your wallet to withdraw to any Naira bank account in your name.</p>

<p>
                                  Kindly let me know if you found this helpful.
                                  <br>
                                  If you need further assistance, I'm available here to help.
                                  <br><br>
                                  Sincerely
                                  <br>
                                  Oluwadamilola Shofarasin
                                  <br>
                                  Customer Success- Cribstock
                                </p>`
    let length = results.length
    let percycle = 1000
    let cycletogo = Math.ceil(length / percycle)
    for (i = 0; i <= cycletogo; i++) {
        let active_array = results.slice(i * (percycle), (percycle) * (1 + i))
        await emailService.segment(active_array, message, "Next Step - Fund Wallet");
    }
}


async function refererx2() {
    let [results, metadata] = await cribstockDatasource.query(`select email, "firstName" from users where username in ( select referer from users where referer is not null GROUP BY referer HAVING COUNT(referer) >1)`)
    const message = `<p>Hello Cribstocker,
                    </p><p>
                    Thank you for sharing Cribstock with your friends, you are a true champion who looks out for others.
                    </p><p>
                    Keep helping more people discover Cribstock, keep earning more bonuses, keep growing.
                    </p><p>
                    We are with you!</p>`
    let length = results.length
    let percycle = 1000
    let cycletogo = Math.ceil(length / percycle)
    for (i = 0; i <= cycletogo; i++) {
        let active_array = results.slice(i * (percycle), (percycle) * (1 + i))
        await emailService.segment(active_array, message, "Dear Passionate Referer...")
    }
}

async function walletnostock() {
    //check tx history
    let [results, metadata] = await cribstockDatasource.query(`select * from (SELECT email, id, "firstName" from users where "id" in (select "userId" from wallets where "updatedAt" != "createdAt")) as something where id not in (select "userId" from stocks)`)
    const message = `<p>Hello Cribstocker,
        </p><p>
        You have successfully funded your Cribstock wallet, now it's time to get that money to work for you.
        </p><p>
        Idle money don't make no money so take these steps to start earning today;
        </p><p>
        Login to your account and go to "Invest"
        </p><p>
        Choose a property you like from the list by clicking on it which would give you a view of the property details.
        </p><p>
        Scroll inside the property details down to where you see "Buy Stock"
        </p><p>
        Click on the "Buy stock" button and proceed to select quantity on the pop-up form.
        </p><p>
        Check if price value matches your wallet balance.
        </p><p>
        Click the "Buy Stock" button under beneath the wallet balance to invest.
        </p><p>
        Congratulations! you have invested successfully
        </p><p>
        Track all earnings from the "Portfolio" section 
        </p><p>
        Repeat this as many times as you desire!</p>`
    let length = results.length
    let percycle = 1000
    let cycletogo = Math.ceil(length / percycle)
    for (i = 0; i <= cycletogo; i++) {
        let active_array = results.slice(i * (percycle), (percycle) * (1 + i))
        await emailService.segment(active_array, message, "Put Your Money into Action")
    }
}
async function walletbelow100() {
    //check tx history
    let [results, metadata] = await cribstockDatasource.query(`select email, id, "firstName" from users where id in (select "userId" from wallets where balance < 100)`)
    const message = `Your Balance is Low`
    results = results.map((res) => { return res.email })
    //console.log({results})
    let length = results.length
    let percycle = 1000
    let cycletogo = Math.ceil(length / percycle)
    for (i = 0; i <= cycletogo; i++) {
        let active_array = results.slice(i * (percycle), (percycle) * (1 + i))
        await emailService.segment(active_array, message, "Your Balance is Low")
    }
}


module.exports = { nonuban, neverfunded, refererx2, walletnostock, walletbelow100, allusers, usernameconflict }

