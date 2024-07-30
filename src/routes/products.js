import { Router } from 'express';
import { read } from '../services/dataServices.js'

const router = Router();


router.get('/list', async (req, res) => {
    try {
        const products = await read('products') 
        res.render('area-membro/products/read', { products })
    } catch (error) {
        console.error('Erro ao buscar dados da tabela:', error)
    }

});

export default router;