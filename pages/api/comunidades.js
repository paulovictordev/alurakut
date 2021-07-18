import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = process.env.REACT_APP_API_DATO_TOKEN_FULL;
        const client = new SiteClient(TOKEN);
        
        // TODO: Validar os dados, antes de sair cadastrando

        const registroCriado = await client.items.create({
            itemType: "977034", // ID do Model de "Communities" criado pelo Dato
            ...request.body,
        })
    
        console.log(registroCriado);
    
        response.json({
            registroCriado: registroCriado,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, só no POST!'
    })
}