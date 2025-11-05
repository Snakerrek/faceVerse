import { USER_DATA_KEY } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "../types/types";

export async function getUserData() {
  const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
  if (jsonValue != null) {
    const storedUserData: UserData = JSON.parse(jsonValue);
    console.log("User display data loaded from AsyncStorage", storedUserData);
    return storedUserData;
  } else {
    console.warn(
      "No user display data in AsyncStorage. Consider fetching from backend."
    );
  }
}

export async function getLoggedInUserID(): Promise<number> {
  const userData = await getUserData();
  if (userData) {
    return userData.id;
  }
  throw new Error("User not found");
}

export async function removeUserData() {
  await AsyncStorage.removeItem(USER_DATA_KEY);
}

export async function storeUserData(userData: UserData) {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem(USER_DATA_KEY, jsonValue);
    console.log("User data stored successfully after login!");
  } catch (e) {
    console.error("Failed to store user data after login.", e);
  }
}
