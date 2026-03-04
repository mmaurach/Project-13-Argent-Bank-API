const BASE_URL = "http://localhost:3001/api/v1/user";

const ApiService = {
  async login(email, password) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data.body.token;
  },

  async getProfile(token) {
    const response = await fetch(`${BASE_URL}/profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Profile fetch failed");
    }

    const data = await response.json();
    return data.body;
  },
};

export default ApiService;
