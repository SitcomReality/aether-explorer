export class KeyboardInput {
  constructor(state) {
    this.state = state;
    this.setupListeners();
  }
  
  setupListeners() {
    document.addEventListener('keydown', (e) => {
      if (e.key >= '1' && e.key <= '4') {
        this.state.tools.selectByKey(e.key);
      }
    });
  }
}