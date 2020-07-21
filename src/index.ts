import dotenv from 'dotenv';
if(process.env.NODE_ENV !== 'production'){
    dotenv.config();
}

import app from './app';
import './database';

app.listen(app.get('port'), ()=>  {
    console.log('Server on port ', app.get('port'));
});
    
