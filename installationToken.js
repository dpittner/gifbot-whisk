const jwt = require('jsonwebtoken');
const requestp = require('./requestAsPromise');

module.exports = (installationId, integrationId, cert) => {
  const token = jwt.sign({ iss: integrationId },
    cert, {
      algorithm: 'RS256',
      expiresIn: '10m'
    });

  return requestp({
    url: `https://api.github.com/installations/${installationId}/access_tokens`,
    json: true,
    headers: {
      'Authorization': 'Bearer ' + token,
      'User-Agent': 'gifbot-whisk',
      'Accept': 'application/vnd.github.machine-man-preview+json'
    },
    method: 'POST'
  })
    .then(({token}) => token);
};
