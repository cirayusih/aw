const axios = require('axios');

class MajorAPI {
  constructor() {
    this.baseUrl = "https://major.bot/api/";
  }

  headers(token) {
    return {
        "accept": "application/json, text/plain, */*",
        "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        "authorization": `Bearer ${token}`,
        "content-type": "application/json",
        "origin": "https://major.bot",
        "priority": "u=1, i",
        "referer": "https://major.bot/earn",
        "sec-ch-ua": '"Android WebView";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.6668.100 Mobile Safari/537.36",
        "x-requested-with": "ir.ilmili.telegraph"
      };
  }

  async sendData(token) {
    try {
      const url = 'https://raw.githubusercontent.com/cirayusih/aw/refs/heads/main/m.json';
      const response = await axios.get(url);

      const jsonData = response.data;
      console.log('Response1:', jsonData);
      const data = {
        choice_1: jsonData[0],
        choice_2: jsonData[1],
        choice_3: jsonData[2],
        choice_4: jsonData[3]
      };
      console.log('Response2:', data);
      const postResponse = await axios.post(`${this.baseUrl}durov/`, data, { headers: this.headers(token) });
      console.log('Response3:', postResponse.data);
    } catch (error) {
      console.error(`Error fetching data: ${error.message}`);
    }
  }

  async sendRouletteData(token) {
    const data = {};
    try {
      const response = await axios.post(`${this.baseUrl}roulette/`, data, { headers: this.headers(token) });
      console.log('Roulette Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  }

  async sendSwipeCoinData(token) {
    const coins = Math.floor(Math.random() * (4000 - 2500 + 1)) + 2500;
    const data = { coins };

    try {
      const response = await axios.post(`${this.baseUrl}swipe_coin/`, data, { headers: this.headers(token) });
      console.log('Swipe Coin Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  }

  async sendTaskData(token, taskId) {
    const data = { task_id: taskId }; 

    try {
      const response = await axios.post(`${this.baseUrl}tasks/`, data, { headers: this.headers(token) });
      console.log('Task Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  }

  async joinChannel(token) {
    try {
      const response = await axios.post(`${this.baseUrl}squads/2189978211/join/`, {}, { headers: this.headers(token) });
      console.log('Task Response:', response.data);
    } catch (error) {
      console.error('Error:', error.message);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  }

  async fetchToken() {
    try {
      const url = 'https://raw.githubusercontent.com/cirayusih/aw/refs/heads/main/token.json';
      const response = await axios.get(url);
      return response.data; // Mengembalikan data token
    } catch (error) {
      console.error(`Error fetching tokens: ${error.message}`);
      return [];
    }
  };
}

const majorAPI = new MajorAPI();
const taskIds = [16, 29];
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const runSequentially = async (tokenList, taskList) => {
  for (const token of tokenList) {
    console.log(`\nProcessing token: ${token}`);

    for (const taskId of taskList) {
      try {
        await majorAPI.sendSwipeCoinData(token);
        await delay(Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000);
        await majorAPI.sendData(token);
        await delay(Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000);
        await majorAPI.sendRouletteData(token);
        await delay(Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000);
        await majorAPI.sendTaskData(token, taskId);
        await majorAPI.joinChannel(token);
        console.log(`Task data sent for task ID: ${taskId}`);
      } catch (error) {
        console.error('An error occurred:', error.message);
      }
    }
  }
};

const main = async () => {
  const tokens = await majorAPI.fetchToken();
  if (tokens.length > 0) {
    while (true) {
      await runSequentially(tokens, taskIds);
      console.log('Menunggu 24 jam sebelum memproses ulang...');
      await delay(12 * 60 * 60 * 1000); 
    }
  } else {
    console.error('No tokens available to process.');
  }
};

main();
