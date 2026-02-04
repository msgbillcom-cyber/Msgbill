const puppeteer = require('puppeteer');
const fs = require('fs');

async function runTest() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(120000); // 2 minutes
  await page.setViewport({ width: 1280, height: 800 });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  try {
    console.log('Navigating to login page directly...');
    await page.goto('http://localhost:3000/auth/login', { waitUntil: 'networkidle2', timeout: 120000 });
    
    await page.screenshot({ path: 'before_login.png' });
    console.log('Filling login form...');
    await page.waitForSelector('input[type="email"]', { visible: true, timeout: 60000 });
    await page.type('input[type="email"]', '2022auradigital@gmail.com');
    await page.type('input[type="password"]', 'Pr@deep8553113306');
    
    console.log('Submitting login...');
    await Promise.all([
      page.click('button[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 120000 }),
    ]);

    console.log('Current URL:', page.url());
    await page.screenshot({ path: 'login_result.png' });

    if (page.url().includes('/dashboard') || page.url().includes('/onboarding')) {
        console.log('Login successful!');
    } else {
        console.log('Login failed, trying signup...');
        await page.goto('http://localhost:3000/auth/signup', { waitUntil: 'networkidle2' });
        await page.waitForSelector('input[placeholder="you@example.com"]');
        await page.type('input[placeholder="you@example.com"]', '2022auradigital@gmail.com');
        await page.type('input[placeholder="••••••••"]', 'Pr@deep8553113306');
        
        // Check for terms checkbox if exists
        const checkbox = await page.$('input[type="checkbox"]');
        if (checkbox) await checkbox.click();

        await page.click('button[type="submit"]');
        console.log('Signup submitted, waiting...');
        await new Promise(r => setTimeout(r, 10000));
        await page.screenshot({ path: 'signup_result.png' });
    }

    // If redirected to onboarding, fill it
    if (page.url().includes('/onboarding')) {
        console.log('Onboarding needed, filling form...');
        await page.waitForSelector('input[name="company_name"]', { visible: true });
        await page.type('input[name="company_name"]', 'Aura Digital Test');
        await page.type('textarea[name="address"]', 'Test Address, Bangalore');
        await page.click('button[type="submit"]');
        await page.waitForNavigation({ waitUntil: 'networkidle2' });
    }

    if (page.url().includes('/dashboard')) {
        console.log('Navigating to create client...');
        await page.goto('http://localhost:3000/dashboard/clients', { waitUntil: 'networkidle2' });
        
        // Check if there's an "Add Client" button
        await page.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll('button'));
            const addBtn = buttons.find(b => b.innerText.includes('Client'));
            if (addBtn) addBtn.click();
        });
        
        await page.waitForSelector('input[name="name"]', { visible: true });
        await page.type('input[name="name"]', 'Test Client ' + Date.now());
        await page.type('input[name="email"]', 'testclient@example.com');
        await page.type('input[name="phone"]', '9876543210');
        await page.click('button[type="submit"]');
        await new Promise(r => setTimeout(r, 5000));
        console.log('Client created.');

        console.log('Navigating to create invoice...');
        await page.goto('http://localhost:3000/dashboard/invoices/new', { waitUntil: 'networkidle2' });
        // Fill invoice form (this part is complex, just try to save empty for now if possible)
        await page.screenshot({ path: 'invoice_page.png' });
    }

  } catch (error) {
    console.error('Test failed:', error);
    await page.screenshot({ path: 'test_error.png' });
  } finally {
    await browser.close();
  }
}

runTest();
