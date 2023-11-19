import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_Mc16ejr6cQ3s1rv3AuM7sBDYNFrVKan3cwDMZWOgdClmP5Yav4a8NKNmRoTw41rh";

export async function fetchBreeds() {
    const response = await axios.get(
      "https://api.thecatapi.com/v1/breeds"
    );
    return response.data;
  }

export async function fetchCatByBreed(breedId){
    const response = await axios.get(
        `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
      );
      return response.data;
}