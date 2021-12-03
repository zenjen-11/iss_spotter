const request = require('request');

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
/*
 const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};


const fetchCoordsByIP = function(ip, callback) {

  request('https://www.whatismyip.com' + ip, function(error, response, body) {
    if (error) {
      callback(error, null);
      return;
    }
      // if non-200 status, assume server error
  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }
  // if we get here, all's well and we got the data
    // if we get here, all's well and we got the data
    const data = JSON.parse(body);
    const latLong = {};
    latLong.latitude = data.data.latitude;
    latLong.longitude = data.data.longitude;
    callback(null, latLong);
      
  });
};


const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
}; */

// makes multiple API calls to determine ISS fly over times
const nextISSTimesForMyLocation = function(callback) {

  fetchMyIP(function(error, ip) {
    if (error) {
      callback(error, null);
      return;
    }

    fetchCoordsByIP(ip, function(error, coords)  {
      if (error) {
        callback(error, null);
        return;
      }

      fetchISSFlyOverTimes(coords, function(error, passTimes) {
        if (error) {
          callback(error, null);
          return;
        }

        callback(null, passTimes);
      });
    });
  });
};

module.exports = {nextISSTimesForMyLocation};



//module.exports = { fetchMyIP };
