(function() {

  var base64 = function() {
    var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

    function _btoa(str) {
      var ans = [], pre, num, rem, letter;

      for (var i = 0, len = str.length; i < len; i++) {
        rem = i % 3;
        num = str.charCodeAt(i);

        if (rem === 0) {
          letter = base64hash.charAt(num >> 2);
          ans.push(letter);
          pre = num & 3;
        } else if (rem === 1) {
          letter = base64hash.charAt((pre << 4) + (num >> 4));
          ans.push(letter);
          pre = num & 15;
        } else if (rem === 2) {
          letter = base64hash.charAt((pre << 2) + (num >> 6));
          ans.push(letter);

          letter = base64hash.charAt(num & 63);
          ans.push(letter);
        }
      }

      if (rem === 0) {
        letter = base64hash.charAt(pre << 4);
        ans.push(letter) && ans.push('=', '=');
      } else if (rem === 1) {
        letter = base64hash.charAt(pre << 2);
        ans.push(letter) && ans.push('=');
      }

      return ans.join('');
    }
    
    function _atob(str) {
      str = str.replace(/\s|=/g,'');
      var ans = [], pre, num, rem, letter;

      for (var i = 0, len = str.length; i < len; i++) {
        rem = i % 4;
        num = base64hash.indexOf(str.charAt(i));  

        if (rem === 0) {
          pre = num;
        } else if (rem === 1) {
          var letter = String.fromCharCode((pre << 2) + (num >> 4));
          ans.push(letter);
          pre = num & 15;
        } else if (rem === 2) {
          var letter = String.fromCharCode((pre << 4) + (num >> 2));
          ans.push(letter);
          pre = num & 3;
        } else {
          var letter = String.fromCharCode((pre << 6) + num);
          ans.push(letter);
        }
      }

      return ans.join('');
    }

    return {
      btoa: _btoa,
      atob: _atob
    };
  }();

  if (!window.btoa && !window.atob) {
    window.btoa = base64.btoa;
    window.atob = base64.atob;
  }
})();