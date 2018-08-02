/* globals URL, browser, ExtOption */

function isChainBlockablePage (urlstr) {
  try {
    const url = new URL(urlstr)
    const supportingHostname = ['twitter.com', 'mobile.twitter.com']
    if (!supportingHostname.includes(url.hostname)) {
      return false
    }
    return /^\/([0-9A-Za-z_]+)\/(followers|following)$/.test(url.pathname)
  } catch (e) {
    return false
  }
}

async function executeChainBlock () {
  const tabs = await browser.tabs.query({active: true, currentWindow: true})
  const currentTab = tabs[0]
  if (!isChainBlockablePage(currentTab.url)) {
    const message = String.raw`Mirror Of Block: PC용 트위터(twitter.com)의 팔로잉 혹은 팔로워 페이지에서만 작동합니다.\n(예: https://twitter.com/(UserName)/followers)`.replace(/'/g, '')
    browser.tabs.executeScript(currentTab.id, {
      code: `window.alert('${message}')`
    })
    return
  }
  browser.tabs.sendMessage(currentTab.id, {
    action: 'MirrorOfBlock/start-chainblock'
  })
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.menu-item.chain-block').onclick = event => {
    event.preventDefault()
    executeChainBlock()
  }
  document.querySelector('.menu-item.open-option').onclick = event => {
    event.preventDefault()
    browser.runtime.openOptionsPage()
  }
  {
    const manifest = browser.runtime.getManifest()
    const currentVersion = document.querySelector('.currentVersion')
    currentVersion.textContent = `버전: ${manifest.version}`
    currentVersion.title = `Mirror Of Block 버전 ${manifest.version}을(를) 사용하고 있습니다.`
  }
  ExtOption.load().then(option => {
    {
      const blockReflection = document.querySelector('.blockReflection')
      const val = option.enableBlockReflection
      blockReflection.classList.toggle('on', val)
      blockReflection.textContent = `차단반사\u{26a0}\u{fe0f}: ${val ? 'On \u2714' : 'Off'}`
    }
    {
      const over10KMode = document.querySelector('.chainBlockOver10KMode')
      const val = option.chainBlockOver10KMode
      over10KMode.classList.toggle('on', val)
      over10KMode.textContent = `슬로우모드: ${val ? 'On \u2714' : 'Off'}`
    }
  })
})
