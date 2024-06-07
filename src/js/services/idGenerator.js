class IDGenerator {
  static generateRandomID() {
    return Math.random().toString(36).substring(2, 6);
  }

  static generateProjectID() {
    return `${this.generateRandomID()}`;
  }

  static generateTaskID(projectID) {
    return `${projectID}_${this.generateRandomID()}`;
  }
}

export { IDGenerator };
