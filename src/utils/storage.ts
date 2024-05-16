import { LastWeekRecordType } from "../components/LastWeek";

const getStorage = (key: string) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? '');
    return value;
  } catch (error) {
    console.error('Saving to storage failed: ' + error)
    return false;
  }
}

const setStorage = (key: string, value: string | number | LastWeekRecordType[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Saving to storage failed: ' + error)
    return false;
  }
}

export { getStorage, setStorage };