const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;



// user name : mymongodb1
// user password : sTfp96nktDrIlCUi

const uri = "mongodb+srv://mymongodb1:sTfp96nktDrIlCUi@cluster0.wbldh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function myFunction() {
    try {
        await client.connect();
        const database = client.db("foodMaster");
        const usersCollection = database.collection("users");
        // create a document to insert
        const doc = {
            title: "rahim",
            content: "rahim@gamil.com",
        }
        const result = await usersCollection.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}
myFunction().catch(console.dir);





app.get('/', (req, res) => {
    res.send('hi this is ui')
})

app.listen(port, () => {
    console.log('hitting the post', port)
})