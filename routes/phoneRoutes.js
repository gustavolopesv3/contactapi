import express from 'express'

import {promises as fs} from 'fs'

const {readFile, writeFile} =fs


const router = express.Router() 

// buscar todos 
router.get('/', async (req, res)=>{
    const data = JSON.parse(await readFile('models/phoneslist.json'));
    res.send(data.phones)
})

//buscando pelo ID
router.get('/:id', async(req,res)=>{
    const data = JSON.parse(await readFile('models/phoneslist.json'));
    const phone = (data.phones = data.phones.filter((phoneFilterId) => {
        return phoneFilterId.id === parseInt(req.params.id);
      }));
    res.send(phone)

})


//criar novo
router.post('/', async(req,res)=>{
    let newContact = req.body
    console.log(newContact)
    const data = JSON.parse(await readFile('models/phoneslist.json'));
    newContact= {id:data.nextId, ...newContact }
    data.nextId++;
    data.phones.push(newContact)
    await writeFile('models/phoneslist.json',JSON.stringify(data,null,2))
    res.send(newContact)
})

//atualizar contato
router.put('/',async(req,res)=>{
    let updateContact = req.body
    const data = JSON.parse(await readFile('models/phoneslist.json'));
    const index = data.phones.findIndex((a)=> a.id === updateContact.id)
    data.phones[index] = updateContact
    await writeFile('models/phoneslist.json',JSON.stringify(data,null,2))
    res.send(updateContact)
})

// deletar um usuario
router.delete('/:id',async(req,res)=>{
    const data = JSON.parse(await readFile('models/phoneslist.json'));
    data.phones = data.phones.filter((phone)=>{
        return phone.id !== parseInt(req.params.id) 
    })
    await writeFile('models/phoneslist.json',JSON.stringify(data,null,2))
    res.send('contato deletado')
})

export default router