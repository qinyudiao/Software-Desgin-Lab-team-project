// Router to handle about page stuff

const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const cors = require('cors');
const app = express();

app.use(cors());


// Authentication token for GitHub 
const token = '4e4283eabc9b44ae65cd8d9c3117a8c5e91c5664';

const config = {
    headers: {
      'User-Agent': 'musarafik',
      'Authorization': 'Token' + token
    }
  }

router.get('/', (req, res, next) => {
    axios.all([
        axios.get('https://api.github.com/repos/qinyudiao/Software-Desgin-Lab-team-project/issues?state=all', config),
        axios.get('https://api.github.com/repos/qinyudiao/Software-Desgin-Lab-team-project/contributors', config)
    ])
    .then(responseArr => {
        res.json([responseArr[0].data, responseArr[1].data]);
    })
    .catch(error =>{
      console.log(error);
    });
});

module.exports = router;

