const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 9000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tfgke.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const sregi = client.db("SCHOOLGHOR").collection("Regi");
        const spregi = client.db("SCHOOLGHOR").collection("Preregi");

        app.get( '/allregi', async (req, res) =>{
            const cursor = sregi.find({});
            const allregi = await cursor.toArray();
            res.send(allregi);
        });
        app.post('/regi', async (req, res) => {
            const regi = req.body;
            const result = await sregi.insertOne(regi);
            console.log(result);
            res.send(regi);
        })
        app.post('/pregi', async (req, res) => {
            const regi = req.body;
            const result = await spregi.insertOne(regi);
            console.log(result);
            res.send(regi);
        })

    }
    finally{

    }
} 
run().catch(err => console.error(err));

app.get('/', (req, res) =>{
    res.send('school ghor server is running');
})

app.listen(port, () =>{
    console.log(`ema john running on: ${port}`)
})