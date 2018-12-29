import {Dimensions, AsyncStorage, NetInfo} from 'react-native';

export async function getKey(itemName) {
    var itemValue = [];
    try {
        const value = await AsyncStorage.getItem(itemName);
        itemValue = JSON.parse(value);
    } catch (error) {
        console.log("Error retrieving data" + error);
    }
    return itemValue;
}

export async  function setKey(itemname, value) {
    try {
    await AsyncStorage.setItem(itemname, JSON.stringify(value)); 
    }catch (error) {
    console.log("Error saving data" + error);
    }
}

export async function resetKey(itemname) {
    try {
    await AsyncStorage.removeItem(itemname);
    } catch (error) {
    console.log("Error resetting data" + error);
    }
}