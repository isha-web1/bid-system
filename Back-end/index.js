const express = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


// Middleware
app.use(cors());
app.use(express.json());


const uri = process.env.DB;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


app.get('/', (req, res) => {
    res.send('Bid-system running on backend!');
});


async function run() {
    try {
        await client.connect();

        const db = client.db('bid_system');
        const productsCollection = db.collection('products');
        const bidsCollection = db.collection('bids');
        const usersCollection = db.collection('users');



        app.post('/users', async (req,res) => {

            const email = req.body.email;
            const query = { email: email };
            const existingUser = await usersCollection.findOne(query);
            if(existingUser){
                return res.send({ message: 'User already exists' });
            }else{
               const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);
            }

            
        })


        app.get('/products', async (req,res)=> {
            const cursor = productsCollection.find();
            const products = await cursor.toArray();
            res.send(products);
        })


        app.get('/products/:id', async (req,res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const product = await productsCollection.findOne(query);
            res.send(product);
        })


        app.post('/products', async (req,res) => {
            const product = req.body;
            const result = await productsCollection.insertOne(product);
            res.send(result);
        })


        app.patch('/products/:id', async (req,res) => {
            const id = req.params.id;
            const updatedData = req.body;
            const query = { _id: new ObjectId(id) };
            const update = {
                $set: {
                    name: updatedData.name,
                    price: updatedData.price,}
            }
            const result = await productsCollection.updateOne(query, update);
            res.send(result);
        })



        app.delete('/products/:id', async (req,res) => {
            const id = req.params.id;
            const result = await productsCollection.deleteOne({ _id: new ObjectId(id) });
            res.send(result);
        })



        // Bids API


        app.get('/bids', async (req,res) => {

            const email = req.query.email;
            const query = {}
            if(email){
                query.buyer_email = email;
            }

            const cursor = bidsCollection.find(query);
            const bids = await cursor.toArray();
            res.send(bids);
        });


        app.post('/bids', async (req,res) => {
            const bid = req.body;
            const result = await bidsCollection.insertOne(bid);
            res.send(result);
        })


        console.log('Connected to MongoDB');
        
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

run();