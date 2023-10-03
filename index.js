const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 3000;

const data = fs.readFileSync('./data/product.json', 'utf-8');
const productData = JSON.parse(data)

app.get('/', (req, res) => {
    res.status(200).send("Hello world...")
})

app.get('/api/v1/products', (req,res) => {
    res.status(200).json({
        message: 'success',
        length: productData.length,
        data: productData
    })
})

app.get('/api/v1/products/:id', (req, res) => {
    const product_id = parseInt(req.params.id);

    const product = productData.find((item) => item.id === product_id);

    res.status(200).json({
        message: 'success',
        data: product
    })
})

app.delete('/api/v1/products/:id', (req, res) => {
    const product_id = parseInt(req.params.id);

    const productIndex = productData.findIndex((item) => item.id === product_id);

    productData.splice(productIndex, 1);

    res.status(204).send();
})

app.listen(PORT, () => {
    console.log(`server started on PORT ${PORT}`);
})