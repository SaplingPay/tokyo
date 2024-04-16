"use server";
import axios from "axios";

const serverUrl = process.env.SERVER_URL ? process.env.SERVER_URL : "";

export async function GetMenus() {
  console.log("GetMenus");
  try {
    console.log("serverUrl", serverUrl);
    const token = await (
      await axios.post(serverUrl + "/getToken", {})
    ).data.token;

    const response = await axios.get(serverUrl + "/menusV2", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function GetMenu(venueId: string, menuId: string) {
  console.log("GetMenu");
  try {
    console.log("serverUrl", serverUrl);
    const token = await (
      await axios.post(serverUrl + "/getToken", {})
    ).data.token;

    const response = await axios.get(
      serverUrl + `/venues/${venueId}/menu/${menuId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function CreateMenuItem({ venue_id, menu_id, data }: any) {
  console.log("CreateMenuItem");
  try {
    console.log("serverUrl", serverUrl);
    const token = await (
      await axios.post(serverUrl + "/getToken", {})
    ).data.token;

    const response = await axios.post(
      serverUrl + `/venues/${venue_id}/menu/${menu_id}/items`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function GetVenue(venueId: string) {
  console.log("GetVenue");
  try {
    console.log("serverUrl", serverUrl);
    const token = await (
      await axios.post(serverUrl + "/getToken", {})
    ).data.token;

    const response = await axios.get(serverUrl + `/venues/${venueId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function GetVenues() {
  console.log("GetVenues");
  try {
    console.log("serverUrl", serverUrl);
    const token = await (
      await axios.post(serverUrl + "/getToken", {})
    ).data.token;

    const response = await axios.get(serverUrl + "/venues", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function CreateVenue(data: any) {
  console.log("CreateVenu");
  try {
    console.log("serverUrl", serverUrl);
    const token = await (
      await axios.post(serverUrl + "/getToken", {})
    ).data.token;

    const response = await axios.post(serverUrl + "/venues", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function CreateMenu({ data, venue_id }: any) {
  console.log("CreateMenu");
  console.log("data", data);
  console.log("venueId", venue_id);
  try {
    console.log("serverUrl", serverUrl);
    const token = await (
      await axios.post(serverUrl + "/getToken", {})
    ).data.token;

    const response = await axios.post(
      serverUrl + `/venues/${venue_id}/menu`,
      data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function UpdateVenue(data: any) {
  console.log("UpdateVenue");
  try {
    console.log("serverUrl", serverUrl);
    const token = await (
      await axios.post(serverUrl + "/getToken", {})
    ).data.token;

    const response = await axios.put(
      serverUrl + `/venues/${data.id}`,
      data.data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function GetUser(userId: string) {
  console.log("GetUser");
  try {
    console.log("serverUrl", serverUrl);
    const token = await (
      await axios.post(serverUrl + "/getToken", {})
    ).data.token;

    const response = await axios.get(serverUrl + `/usersV2/${userId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function CreateUser(data: any) {
  console.log("CreateUser");
  try {
    console.log("serverUrl", serverUrl);
    const token = await (
      await axios.post(serverUrl + "/getToken", {})
    ).data.token;

    const response = await axios.post(serverUrl + "/usersV2", data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}

export async function UpdateUser(data: { id: string; data: any }) {
  console.log("UpdateUser");
  try {
    console.log("serverUrl", serverUrl);
    const token = await (
      await axios.post(serverUrl + "/getToken", {})
    ).data.token;

    const response = await axios.put(
      serverUrl + `/usersV2/${data.id}`,
      data.data,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );

    // Return the response from the external endpoint
    return response.data;
  } catch (err: any) {
    console.error("Proxy request failed:", err.response?.data || err.message);
    console.log(err.response?.status);
    const errorMessage =
      err.response?.data?.error || err.message || "Proxy request failed";
    return { error: errorMessage };
  }
}
