class scoreTracker {
    constructor() {
        this.score = 0;
    }

    setScore(s) {
        this.score = s;
    }

    getScore(s) {
        return this.score;
    }

    addDroplet() {
        this.score += 10;
    }

    reset(){
        this.score = 0;
    }
}

var e = new scoreTracker();

export function set(s) {
    e.setScore(s);
} 

export function get() {
    return e.getScore();
}

export function add () {
    e.addDroplet();
}


export function reset(){
    e.reset();
}