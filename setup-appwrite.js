const { Client, Databases } = require('node-appwrite');

const client = new Client()
    .setEndpoint('https://tor.cloud.appwrite.io/v1')
    .setProject('69bdb28e003c4db80f0a')
    .setKey('standard_8c341adee1b04da707b3b849591270f0a14b492618a0e169517e00a35a9fd73a89e7b1ec907138d34d93adaa2d7794c16860cdc39ca35995f199c6b3f917f96ba5a699f7b663c2bc94e7d4019d3361c568353394db026e209fac026d38c2ead87322181beead655e9b68d56664661f4d02142a63d685099df828cff2d6905aa7');

const databases = new Databases(client);

async function createCollectionSafe(dbId, colId, name) {
    try {
        await databases.createCollection(dbId, colId, name);
        console.log(`Collection ${colId} created.`);
    } catch(e) {
        if (e.code === 409) console.log(`Collection ${colId} already exists.`);
        else throw e;
    }
}

async function createStringAttributeSafe(dbId, colId, key, size, required, array = false) {
    try {
        await databases.createStringAttribute(dbId, colId, key, size, required, undefined, array);
        console.log(`Attribute ${key} created on ${colId}.`);
    } catch(e) {
        if (e.code === 409) console.log(`Attribute ${key} already exists on ${colId}.`);
        else throw e;
    }
}

async function createBooleanAttributeSafe(dbId, colId, key, required, array = false) {
    try {
        await databases.createBooleanAttribute(dbId, colId, key, required, undefined, array);
        console.log(`Attribute ${key} created on ${colId}.`);
    } catch(e) {
        if (e.code === 409) console.log(`Attribute ${key} already exists on ${colId}.`);
        else throw e;
    }
}

async function createDatetimeAttributeSafe(dbId, colId, key, required, array = false) {
    try {
        await databases.createDatetimeAttribute(dbId, colId, key, required, undefined, array);
        console.log(`Attribute ${key} created on ${colId}.`);
    } catch(e) {
        if (e.code === 409) console.log(`Attribute ${key} already exists on ${colId}.`);
        else throw e;
    }
}

async function setup() {
    try {
        console.log('Creating database bereft_db...');
        let dbId = 'bereft_db';
        try {
            await databases.create(dbId, 'Bereft Database');
            console.log('Database created.');
        } catch(e) {
            if (e.code === 409) console.log('Database already exists.');
            else throw e;
        }

        // 1. Contacts
        console.log('\n--- Contacts ---');
        await createCollectionSafe(dbId, 'contacts', 'Contacts');
        await createStringAttributeSafe(dbId, 'contacts', 'userId', 255, true);
        await createStringAttributeSafe(dbId, 'contacts', 'name', 255, true);
        await createStringAttributeSafe(dbId, 'contacts', 'email', 255, false);
        await createStringAttributeSafe(dbId, 'contacts', 'company', 255, false);
        await createStringAttributeSafe(dbId, 'contacts', 'title', 255, false);
        await createStringAttributeSafe(dbId, 'contacts', 'type', 255, true);
        await createStringAttributeSafe(dbId, 'contacts', 'domain', 255, false);
        await createStringAttributeSafe(dbId, 'contacts', 'industry', 255, false);
        await createStringAttributeSafe(dbId, 'contacts', 'tags', 255, false, true);

        // 2. Tasks
        console.log('\n--- Tasks ---');
        await createCollectionSafe(dbId, 'tasks', 'Tasks');
        await createStringAttributeSafe(dbId, 'tasks', 'userId', 255, true);
        await createStringAttributeSafe(dbId, 'tasks', 'title', 255, true);
        await createStringAttributeSafe(dbId, 'tasks', 'description', 5000, false);
        await createStringAttributeSafe(dbId, 'tasks', 'priority', 255, false);
        await createStringAttributeSafe(dbId, 'tasks', 'status', 255, false);
        await createStringAttributeSafe(dbId, 'tasks', 'dueDate', 255, false);
        await createStringAttributeSafe(dbId, 'tasks', 'assignee', 255, false);

        // 3. Docs
        console.log('\n--- Docs ---');
        await createCollectionSafe(dbId, 'docs', 'Docs');
        await createStringAttributeSafe(dbId, 'docs', 'userId', 255, true);
        await createStringAttributeSafe(dbId, 'docs', 'title', 255, true);
        await createStringAttributeSafe(dbId, 'docs', 'content', 10000, false);
        await createStringAttributeSafe(dbId, 'docs', 'type', 255, true);

        // 4. Events
        console.log('\n--- Events ---');
        await createCollectionSafe(dbId, 'events', 'Events');
        await createStringAttributeSafe(dbId, 'events', 'userId', 255, true);
        await createStringAttributeSafe(dbId, 'events', 'title', 255, true);
        await createDatetimeAttributeSafe(dbId, 'events', 'startTime', true);
        await createDatetimeAttributeSafe(dbId, 'events', 'endTime', true);
        await createStringAttributeSafe(dbId, 'events', 'type', 255, false);
        await createStringAttributeSafe(dbId, 'events', 'location', 255, false);
        await createStringAttributeSafe(dbId, 'events', 'description', 5000, false);

        // 5. Emails
        console.log('\n--- Emails ---');
        await createCollectionSafe(dbId, 'emails', 'Emails');
        await createStringAttributeSafe(dbId, 'emails', 'userId', 255, true);
        await createStringAttributeSafe(dbId, 'emails', 'senderName', 255, true);
        await createStringAttributeSafe(dbId, 'emails', 'senderEmail', 255, true);
        await createStringAttributeSafe(dbId, 'emails', 'subject', 1000, false);
        await createStringAttributeSafe(dbId, 'emails', 'body', 10000, false);
        await createBooleanAttributeSafe(dbId, 'emails', 'unread', false);
        await createStringAttributeSafe(dbId, 'emails', 'folder', 255, false);

        // 6. Agents
        console.log('\n--- Agents ---');
        await createCollectionSafe(dbId, 'agents', 'Agents');
        await createStringAttributeSafe(dbId, 'agents', 'userId', 255, true);
        await createStringAttributeSafe(dbId, 'agents', 'name', 255, true);
        await createStringAttributeSafe(dbId, 'agents', 'instructions', 5000, false);
        await createStringAttributeSafe(dbId, 'agents', 'status', 255, false);

        // 7. Chats
        console.log('\n--- Chats ---');
        await createCollectionSafe(dbId, 'chats', 'Chats');
        await createStringAttributeSafe(dbId, 'chats', 'userId', 255, true);
        await createStringAttributeSafe(dbId, 'chats', 'title', 255, true);

        console.log('\nSetup complete!');
    } catch (error) {
        console.error('Error during setup:', error);
    }
}

setup();
