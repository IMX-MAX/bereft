const { Composio } = require('composio-core');

async function test() {
  try {
    const composio = new Composio({ apiKey: process.env.COMPOSIO_API_KEY });
    
    const apps = await composio.apps.list();
    console.log("Apps count:", apps?.items?.length || apps?.length);
    if(apps?.items) {
      console.log(apps.items[0]);
    } else if (apps) {
      console.log(apps[0]);
    }

  } catch (e) {
    console.error(e);
  }
}

test();
