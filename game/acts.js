export class ActManager {
  constructor(state) {
    this.state = state;
    this.currentAct = 0;
    this.actStartTime = 0;
  }
  
  update(dt) {
    const distance = this.state.ship.distanceTraveled;
    
    // Act transitions based on distance
    if (this.currentAct === 1 && distance > 10) {
      this.startAct2();
    } else if (this.currentAct === 2 && distance > 30) {
      this.startAct3();
    }
  }
  
  startAct1() {
    this.currentAct = 1;
    this.actStartTime = Date.now();
    
    this.state.dialogue.queue([
      {
        character: 'Dr. Zeppo',
        text: 'By Einstein\'s beard! The readings are all wrong! Light isn\'t constant at all!'
      },
      {
        character: 'Prof. Bloop',
        text: 'Impossible! E=mc² has been the foundation of physics for centuries!'
      },
      {
        character: 'Dr. Zeppo',
        text: 'Look at the aether density! Light moves FASTER in sparse regions! Dark matter... it\'s just aether variation!'
      }
    ]);
  }
  
  startAct2() {
    this.currentAct = 2;
    
    this.state.dialogue.queue([
      {
        character: 'Prof. Bloop',
        text: 'We\'re reaching the galactic rim! The aether is getting more turbulent!'
      },
      {
        character: 'Dr. Zeppo',
        text: 'Manipulate the aether density ahead of us! We need a clear path!'
      }
    ]);
  }
  
  startAct3() {
    this.currentAct = 3;
    
    this.state.dialogue.queue([
      {
        character: 'Dr. Zeppo',
        text: 'The cosmic microwave background! We\'re at the edge of the universe!'
      },
      {
        character: 'Prof. Bloop',
        text: 'All our equations... we\'ll have to rewrite every textbook!'
      }
    ]);
  }
}