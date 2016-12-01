var timer = {
  // properties
  interval: null,
  deadline: null,
  // methods
  getTimeLeft: function(){
    var t = Date.parse(this.deadline) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 ).toString();
    var minutes = Math.floor( (t/1000/60) % 60 ).toString();
    // pad the zeros
    if (seconds.length == 1){
      seconds = "0" + seconds;
    };

    if (t < 1){
      return {
        "minutes": "0",
        "seconds": "00",
        "timer": t,
      }
    }
    return {
    "minutes": minutes,
    "seconds": seconds,
    "total": t,
    }; 
  },

  timer:function(deadline){
    // **
    this.clearTimer();
    // console.log("test");
    // 1) get the deadline
    this.deadline = new Date( Date.now() + (deadline * 1000));
    // console.log(this.deadline);
    // 2.) create an update for every second
    this.interval = window.setInterval(function(){
      // console.log(this);
      var timeLeft = this.getTimeLeft();
      var clock = document.querySelector("#clock");
      //update the view
      clock.innerHTML = '<span>' + timeLeft.minutes + '</span>'
                      + '<span>' + " : " + '</span>'
                      + '<span>' + timeLeft.seconds + '</span>';
      // clearTimer
      if (timeLeft.total < 1){
        this.clearTimer();
      }
    }.bind(this), 1000);
  },

  clearTimer: function(){
    clearInterval(this.update);
  }

}


// Event listener
// function test(){alert("hi")};
window.onload =  function(){
  var deadline = 120; // in seconds
  timer.timer(deadline);
};

document.querySelector("#new-country").addEventListener("click", function(){
  var deadline = 120; // in seconds
  timer.timer(deadline);
});
