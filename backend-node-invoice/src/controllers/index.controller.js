const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL|| 'postgres://postgres:Welcome2022@localhost:5432/invoice_db',
    ssl: process.env.DATABASE_URL ? true : false,
})

const getInvoice = async (req,res)=>{
    try
    {
        const response = await pool.query('SELECT * FROM invoice');
        res.status(200).json(response.rows);
    }
    catch(error){
        console.log(error);
        res.send("Error: "+error);
    }
};


const updateInvoice = async(req,res) => {
    const {data} = req.body
    if(data.length > 0){
        let values = data.reduce((query, item, i)=>{
            const id = i+1;
            return query+=`${'('+ id +','+ item.invoice_no +','+ `'`+item.description +`'`+','+ `'`+ item.status+`'` +','+ item.amount +','+`'`+item.created_date+`'` +'),'}`
        },'')
        values = values.substring(0, values.length-1);
        await pool.query(` TRUNCATE TABLE invoice`);
        const response = await pool.query(`INSERT INTO invoice (id, invoice_no, description, status, amount, created_date) VALUES ${values}`);
    }else{
        await pool.query(` TRUNCATE TABLE invoice`);
    }
    
    res.json('Invoice updated successfully');
};

module.exports = {
    getInvoice,
    updateInvoice
}