chrome?.runtime?.onInstalled?.addListener((details) => {
  const currentVersion = chrome.runtime.getManifest().version;
  const previousVersion = details.previousVersion;
  const reason = details.reason;

  console.log(`Previous Version: ${previousVersion}`);
  console.log(`Current Version: ${currentVersion}`);

  chrome.contextMenus.create({
    id: 'sampleContextMenu',
    title: 'Sample Context Menu',
    contexts: ['selection'],
  });

  switch (reason) {
    case 'install':
      chrome.tabs.create({
        url: 'onboarding.html',
        active: true,
      });
      break;
    case 'update':
      chrome.tabs.create({
        url: 'onboarding.html',
        active: true,
      });
      break;
    default:
      console.log('Other install events within the browser');
      break;
  }
});
