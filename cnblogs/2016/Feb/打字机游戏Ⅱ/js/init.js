(function() {
  // get data
  $.ajax ({
    type: 'GET',
    url: 'data.html',
    dataType: 'html',
    async: false,  // 异步
    success: function (msg) {
      window.array = msg.split(/[^A-z]+/)
    }
  });
  
  // create 9 divs to form a circle
  for(var i = 0; i <= 8; i++) {
    var d = document.createElement('div');
    d.className = 'circle';
    d.index = i;

    if(i !== 8) {
    	var word;
    	while(true) {
    		word = window.array[~~(Math.random() * window.array.length)];
    		if(word.length < 4 || word.length > 10) continue;
    		break;
    	}
     
      var left = (100 - word.length * 8) / 2;
      for(var j = 0; j < word.length; j++) {
        var c = document.createElement('div');
        c.className = 'cell font';
        c.innerHTML = word[j];
        c.style.left = left + j * 8;
        d.appendChild(c);
      }
    }
  
    var deg = 40 * i;  
    d.style.webkitTransform = ''
    + 'rotateY(' + deg + 'deg)' 
    + 'translateZ(' + 190 + 'px)';
    document.getElementById('container').appendChild(d);
  }
})();