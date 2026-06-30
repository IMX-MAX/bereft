const { Client, Databases, ID } = require('node-appwrite');

const client = new Client()
    .setEndpoint('https://tor.cloud.appwrite.io/v1')
    .setProject('69bdb28e003c4db80f0a')
    .setKey('standard_8c341adee1b04da707b3b849591270f0a14b492618a0e169517e00a35a9fd73a89e7b1ec907138d34d93adaa2d7794c16860cdc39ca35995f199c6b3f917f96ba5a699f7b663c2bc94e7d4019d3361c568353394db026e209fac026d38c2ead87322181beead655e9b68d56664661f4d02142a63d685099df828cff2d6905aa7');

const databases = new Databases(client);

async function seed() {
    try {
        console.log("Seeding Appwrite DB...");
        
        await databases.createDocument('bereft_db', 'agents', ID.unique(), {
            userId: 'test_user',
            name: 'Inbox Triage Pro',
            instructions: 'Reads Slack + Gmail, drafts replies, logs to Notion automatically.'
        });
        
        await databases.createDocument('bereft_db', 'chats', ID.unique(), {
            userId: 'test_user',
            title: 'Summarize my unread Slack and draft replies'
        });

        console.log("Seeding complete!");
    } catch(e) {
        console.error(e);
    }
}

seed();
