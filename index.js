const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;


const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());

// user name : mymongodb1
// user password : sTfp96nktDrIlCUi



const uri = "mongodb+srv://mymongodb1:sTfp96nktDrIlCUi@cluster0.wbldh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//     const collection = client.db("footMaster").collection("users");

//     // perform actions on the collection object
//     console.log('hitting the data base')
//     // console.error(err)
//     const user = { name: 'mahiya mahi', email: 'maji@gmail.com', phone: '0155234421548' }
//     collection.insertOne(users)
//         .then(() => {
//             console.log("insert successfully")
//         })

//     // client.close();
// });
// async function run() {
//     try {
//         await client.connect();
//         const database = client.db("footMaster");
//         const usersCollection = database.collection("users");
//         // create a document to insert
//         const doc = {
//             name: "Special one",
//             content: "spacial@hotmailo.com",
//         }
//         const result = await usersCollection.insertOne(doc);
//         console.log(`A document was inserted with the _id: ${result.insertedId}`);
//     } finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);

async function myFunction() {
    try {
        await client.connect();
        const database = client.db("foodMaster");
        const usersCollection = database.collection("users");
        //get API

        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        });

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const user = await usersCollection.findOne(query);
            console.log('load user with id', id);
            res.send(user);
        })
        // POST API
        app.post('/users', async (req, res) => {
            const newUser = req.body;

            const result = await usersCollection.insertOne(newUser)
            // console.log('got new user', req.body)
            // console.log('got new user ', result)
            res.json(result)
        });
        // delete API
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query)
            console.log('deleting user with id', result)

            res.json(result)
        })

    } finally {
        // await client.close();
    }
}
myFunction().catch(console.dir);


app.get('/', (req, res) => {
    res.send('check me CRUD hi')
})

app.listen(port, () => {
    console.log('i am listening to ypu')
})