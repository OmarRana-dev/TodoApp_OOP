const LOCAL_STORAGE_KEY = 'todoAppData';

class LocalStorageService {
  static saveData(data) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }

  static loadData() {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    return JSON.parse(data);
  }
}

export { LocalStorageService };
