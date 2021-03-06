(async () => {
  const puppeteer = require('puppeteer')
      , browser = await puppeteer.launch({ headless: process.env.HEADLESS !== 'false' })
      , { test } = require('tap')    

  await test('define, use component on page, with stylesheet, hot reload', async ({ plan, same }) => {
    plan(2)
    const { ripple, page } = await startup()

    // register component and css
    ripple
      .resource('web-component', node => node.innerHTML = 'foo')

    // append to page
    await page.evaluate(() => {
      foo = document.createElement('web-component')
      document.body.appendChild(foo)
      foo.render()
    })

    // check rendered
    await page.waitFor('web-component')
    same('foo', await page.evaluate(() => foo.innerHTML))

    // register new version of component
    ripple('web-component', node => node.innerHTML = 'boo')
    same('boo', await page.evaluate(() => foo.innerHTML))

    await page.close()
  })

  await test('auto load components, with dependencies', async ({ plan, same }) => {
    plan(1)
    const { ripple, page } = await startup(`<auto-loaded-component id="component"></auto-loaded-component>`)

    // check rendered
    await page.waitFor(() => component.innerHTML == 'foo')
    same(['./resources/utils/foo.js', 'auto-loaded-component'], await page.evaluate(() => Object.keys(ripple.resources)))
    
    await page.close()
  })

  await browser.close()
  process.exit(0)

  async function startup(body = ''){
    const ripple = require('..')({ port: 0, dir: __dirname })
    ripple.server.express.use((req, res) => res.send(`
      <script src="/ripple.min.js"></script>
      <body>${body}</body> 
    `))

    await ripple.server.once('listening')

    const page = await browser.newPage()

    await page.goto(`http://localhost:${ripple.server.port}`)

    if (process.env.DEBUG == 'true')
      page.on('console', (...args) => console.log('(CLIENT):', ...args))

    return { ripple, page }
  }
})()