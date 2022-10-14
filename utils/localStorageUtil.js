class LocalStorageUtil {
  constructor() {
    this.SELECTED_PUBLICATION = '@selectedPublication';
  }

  set = (key, value) => {
    if (window) {
      const jsonValue = JSON.stringify(value);
      window.localStorage.setItem(key, jsonValue);
    }
  };

  get = (key) => {
    if (window) {
      const jsonValue = window.localStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    }
    return null;
  };
}

export default new LocalStorageUtil();
