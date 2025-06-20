
import * as qrhandler from './functions/qr-handler'
import * as userhandler from './functions/user-handler'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { command, data } = req.body || {};
    let response;
    
    // validate command
    if (!command) {
        return res.status(400).json({ error: 'Missing command' });
    }

    // perform command
    switch (command) {
      case 'create-qr':
        response = await qrhandler.createQrCode(data);
        break;

      case 'update-qr':
        response = await qrhandler.updateQrCode(data);
        break

      case 'delete-qr':
        response = await qrhandler.deleteQrCode(data);
        break
        
      
      case 'slug-exists':
        response = await qrhandler.slugExists(data);
        break;

      case 'get-user-qr-codes':
        response = await qrhandler.getUserQrCodes(data);
        break;

      //  ██╗ ██╗  ██╗ ██╗  ██╗ ██╗ 
      // ████████╗████████╗████████╗
      // ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
      // ████████╗████████╗████████╗
      // ╚██╔═██╔╝╚██╔═██╔╝╚██╔═██╔╝
      //  ╚═╝ ╚═╝  ╚═╝ ╚═╝  ╚═╝ ╚═╝ 
                                 

      case 'add-user':
        response = await userhandler.addUser(data);
        break
      
      case 'get-user':
        response = await userhandler.getUser(data);
        break

      default:
        return res
          .status(400)
          .json({ error: `Unknown command: ${command}` });
    }


    // check response
    if (response) {
        if (response.success) {
          res.json({response})
        } else {
          res.json({error: response});
        }
    } else {
      res.json({error: 'Error: bad response'});
    }


  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
