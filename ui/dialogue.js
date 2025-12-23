export class DialogueManager {
  constructor() {
    this.messages = [];
    this.current = null;
    this.displayTime = 0;
    
    this.box = document.getElementById('dialogue-box');
    this.nameEl = document.getElementById('character-name');
    this.textEl = document.getElementById('dialogue-text');
    this.portraitEl = document.getElementById('character-portrait');
  }
  
  queue(messages) {
    this.messages.push(...messages);
    if (!this.current) {
      this.showNext();
    }
  }
  
  showNext() {
    if (this.messages.length === 0) {
      this.hide();
      return;
    }
    
    this.current = this.messages.shift();
    this.displayTime = 0;
    
    this.nameEl.textContent = this.current.character;
    this.textEl.textContent = this.current.text;
    this.portraitEl.src = 'assets/placeholder-portrait.png';
    
    this.box.classList.remove('hidden');
  }
  
  hide() {
    this.current = null;
    this.box.classList.add('hidden');
  }
  
  update(dt) {
    if (!this.current) return;
    
    this.displayTime += dt;
    
    if (this.displayTime > 5) {
      this.showNext();
    }
  }
}