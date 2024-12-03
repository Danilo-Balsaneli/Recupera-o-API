const express = require('express');
const server = express();
server.use(express.json());

const regex = /./g;

// const validaHatch = /HATCH/; 
// const validaSedan = /SEDAN/;
// const validaSuv = /SUV/;
// const validaPicape = /PICAPE/;

const clientes = [];
const carros = [];

// CLIENTES

// Cadastra novos clientes
server.post('/clientes', (req, res) => {
    let id = 0;
    const nome_cliente = req.body.nome;
    const telefone = req.body.telefone;

    if(nome_cliente.match(regex).length < 3){
        if(nome_cliente.match(regex).length > 100){
            res.json({"mensagem": "Nome deve conter no maximo 100 caracteres"});
            return;
        }
        res.json({"mensagem": "Nome deve conter no minimo 3 caracteres"});
        return;
    }
    if(!telefone.match(regex).length == 11){
        res.json({"mensagem": "Telefone deve conter extamente 11 digitos"});
    }
    clientes.forEach(cliente => {
        if(cliente.id > id){
            id = cliente.id;
        }
    });

    const cliente = {
        id: id + 1,
        nome: nome_cliente,
        telefone: telefone
    }
    clientes.push(cliente);
    res.json({"mensagem": "Cliente cadastrado com sucesso"});
});

// Atualiza informações de um cliente pelo id
server.put('/clientes/:codigo', (req, res) => {
    const idCliente = req.params.codigo;
    
    const indiceCliente = clientes.find(clientes => clientes.id === parseInt(idCliente));

    if(indiceCliente == -1){
        res.json({"mensagem":"Cliente não encontrado"});
        return;
    }

    const nome_cliente = req.body.nome;
    const telefone = req.body.telefone;

    if(nome_cliente.match(regex).length < 3){
        if(nome_cliente.match(regex).length > 100){
            res.json({"mensagem": "Nome deve conter no maximo 100 caracteres"});
            return;
        }
        res.json({"mensagem": "Nome deve conter no minimo 3 caracteres"});
        return;
    }
    if(!telefone.match(regex).length == 11){
        res.json({"mensagem": "Telefone deve conter extamente 11 digitos"});
    }

    console.log(indiceCliente);

    const cliente = {
        nome: nome_cliente,
        telefone: telefone
    }
    console.log(cliente);
    clientes[indiceCliente] = cliente;
    res.json({"mensagem": "Cliente atualizado com sucesso"});
});

// Remove clientes
server.delete('/clientes/:codigo', (req, res) => {
    const idCliente = req.params.codigo;
    
    const indiceCliente = clientes.findIndex(clientes => clientes.id === parseInt(idCliente));

    if(indiceCliente == -1){
        res.json({"mensagem":"Cliente não encontrado"});
        return;
    }
    clientes.splice(indiceCliente);
    res.json({"mensagem":"Cliente removido com sucesso"});
})

// Busca clientes pelo ID
server.get('/clientes/:codigo', (req, res) => {
    const idCliente = req.params.codigo;
    
    const indiceCliente = clientes.findIndex(clientes => clientes.id === parseInt(idCliente));

    if(indiceCliente == -1){
        res.json({"mensagem":"Cliente não encontrado"});
        return;
    }
    res.json(clientes[indiceCliente]);
});

// Busca todos os clientes
server.get('/clientes', (req, res) => {
    if(clientes.length <= 0){
        res.json({"mensagem": "Nenhum cliente cadastrado"});
        return;s
    }
    res.json(clientes);
});

// CARROS

// Cadastro de carros
server.post('/carros', (req, res) => {
    let id = 0;
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const tamanho = req.body.tamanho;
    const id_cliente = req.body.id_cliente;

    carros.forEach(carro => {
        if(carro.id > id){
            id = carro.id;
        }
    });
    if(marca.match(regex).length < 3){
        if(marca.match(regex).length > 50){
            res.json({"mensagem": "Marca deve conter maximo 50 caracteres"});
            return;
        }
        res.json({"mensagem": "Marca deve conter no minimo 3 caracteres"});
        return;
    }
    if(modelo.match(regex).length < 2){
        if(modelo.match(regex).length > 50){
            res.json({"mensagem": "Modelo deve conter maximo 50 caracteres"});
            return;
        }
        res.json({"mensagem": "Modelo deve conter no minimo 2 caracteres"});
        return;
    }
    // if(!validaHatch.test(tamanho)){
    //     if(!validaSedan.test(tamanho)){
    //         if(!validaSuv.test(tamanho)){
    //             if(!validaPicape.test(tamanho)){
    //                 res.json({"mensagem": "Tamanho dever ser HATCH, SEDAN, SUV ou PICAPE"});
    //                 return;
    //             }
    //             res.json({"mensagem": "Tamanho dever ser HATCH, SEDAN, SUV ou PICAPE"});
    //             return;
    //         }
    //         res.json({"mensagem": "Tamanho dever ser HATCH, SEDAN, SUV ou PICAPE"});
    //         return;
    //     }
    //     res.json({"mensagem": "Tamanho dever ser HATCH, SEDAN, SUV ou PICAPE"});
    //     return;
    // }
    
    // if(parseInt(id_cliente) != parseInt(clientes.id)){
    //     console.log(id_cliente);
    //     res.json({"mensagem": "Cliente não cadastrado"});
    //     return;
    // }

    const carro = {
        id : id + 1,
        marca: marca,
        modelo: modelo,
        tamanho: tamanho,
        cliente: id_cliente
    }
    carros.push(carro);
    res.json({"mensagem": "Carro cadastrado com sucesso"});
});

// Atualiza as informações de um carro
server.put('/carros/:codigo', (req,res) => {
    const idCarro = req.params.codigo;
    
    const indiceCarros = carros.findIndex(carros => carros.id === parseInt(idCarro));

    if(indiceCarros == -1){
        res.json({"mensagem":"Carro não encontrado"});
        return;
    }
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const tamanho = req.body.tamanho;
    const id_cliente = req.body.id_cliente;

    if(marca.match(regex).length < 3){
        if(marca.match(regex).length > 50){
            res.json({"mensagem": "Marca deve conter maximo 50 caracteres"});
            return;
        }
        res.json({"mensagem": "Marca deve conter no minimo 3 caracteres"});
        return;
    }
    if(modelo.match(regex).length < 2){
        if(modelo.match(regex).length > 50){
            res.json({"mensagem": "Modelo deve conter maximo 50 caracteres"});
            return;
        }
        res.json({"mensagem": "Modelo deve conter no minimo 2 caracteres"});
        return;
    }

    const carro = {
        marca: marca,
        modelo: modelo,
        tamanho: tamanho,
        cliente: id_cliente
    }
    carros[indiceCarros] = carro;
    res.json({"mensagem": "Carro atualizado com sucesso"});
});

// Remove os carros pelo id
server.delete('/carros/:codigo', (req, res) => {
    const idCarro = req.params.codigo;
    
    const indiceCarros = carros.findIndex(carros => carros.id === parseInt(idCarro));

    if(indiceCarros == -1){
        res.json({"mensagem":"Carro não encontrado"});
        return;
    }
    carros.splice(indiceCarros);
    res.json({"mensagem": "Carro removido com sucesso"});
})

// Busca os carros pelo id
server.get('/carros/:codigo', (req, res) => {
    const idCarro = req.params.codigo;
    
    const indiceCarros = carros.findIndex(carros => carros.id === parseInt(idCarro));

    if(indiceCarros == -1){
        res.json({"mensagem":"Carro não encontrado"});
        return;
    }
    res.json(carros[indiceCarros]);
});

// Busca todos os carros
server.get('/carros', (req, res) => {
    if(carros.length <= 0){
        res.json({"mensagem": "Nenhum carro cadastrado"});
        return;
    }
    res.json(carros);
});

server.listen(3000, () => console.log('Rodando'));

module.exports = server();