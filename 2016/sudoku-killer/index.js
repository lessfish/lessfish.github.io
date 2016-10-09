// create table
!function() {
  var table = document.createElement('table');
  for(var i = 0; i < 9; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < 9; j++) {
      var td = document.createElement('td');
      td.innerHTML = "<input type='text' />";
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.body.appendChild(table);

  var button = document.createElement('button');
  button.innerHTML = 'Click to solve';
  button.onclick = function() {
    // get sudoku map
    /*
    window.a = [
      [3, '', 1, 4, 2, 9, '', '', 6],
      ['', '', '', 8, '', 1, '', 5, ''],
      [4, 8, '', '', 5, '', 2, '', ''],
      [1, '', '', '', 8, 2, 6, 9, ''],
      ['', '', '', '', '', 5, '', 8, 7],
      ['', '', 7, 3, 6, '', '', '', 2],
      ['', 7, '', 9, 4, '', 1, '', 3],
      [9, 4, '', '', '', 6, '', '', ''],
      [6, 1, '', '', 7, 3, '', '', 5]
    ];
    */

    var tds = document.getElementsByTagName('td');
    window.a = [];
    for (var i = 0; i < 9; i++) {
      window.a[i] = [];
      for (var j = 0; j < 9; j++) {
        var index = i * 9 + j;
        var value = tds[index].children[0].value;
        if (value.length)
          a[i][j] = Number(value);
        else
          a[i][j] = '';
      }
    }

    // blanks to fill
    window.res = [];

    // get blanks
    getArray();

    console.time('solving time');
    // start to solve
    dfs(0);
    console.timeEnd('solving time');
  };

  document.body.appendChild(button);
}();


// check 9 blanks
function check(tmp) {
  var hash = {};

  for (var i = 0; i < 9; i++) {
    var item = tmp[i];
    if (item === '')
      continue;
    if (hash[item])
      return true;
    hash[item] = true;
  }

  return false;
}

function totalCheck() {
  // check 9 3*3 boxes
  for (var i = 0; i < 9; i += 3)
    for (var j = 0; j < 9; j += 3) {
      var tmp = [];
      for (var _i = i; _i < i + 3; _i++)
        for (var _j = j; _j < j + 3; _j++)
          tmp.push(a[_i][_j]);

      if (check(tmp))
        return true;
    }

  // check 9 rows
  for (var i = 0; i < 9; i++) {
    var tmp = [];
    for (var j = 0; j < 9; j++)
      tmp.push(a[i][j]);

    if (check(tmp))
      return true;
  }

  // check 9 columns
  for (var j = 0; j < 9; j++) {
    var tmp = [];
    for (var i = 0; i < 9; i++)
      tmp.push(a[i][j]);

    if (check(tmp))
      return true;
  }

  // a reasonable case!
  return false;
}

function dfs(index) {
  if (index === res.length) {
    var tds = document.getElementsByTagName('td');
    for (var i = 0; i < 9; i++) {
      for (var j = 0; j < 9; j++) {
        var index = 9 * i + j;
        tds[index].children[0].value = a[i][j];
      }
    }

    return;
  }

  // to fill the blank of a[res[index].x][res[index].y]
  for (var i = 1; i <= 9; i++) {
    var x = res[index].x
      , y = res[index].y;

    // image filling "i" in this blank
    a[x][y] = i;

    // then check
    var f = totalCheck();

    // not pass the check
    if (f) {
      // restore
      a[x][y] = '';
      continue;
    }

    dfs(index + 1);

    // backtrack
    a[x][y] = '';
  }
}

// get blanks which should be filled
function getArray() {
  for (var i = 0; i < 9; i++)
    for (var j = 0; j < 9; j++) {
      if (a[i][j] === '') {
        res.push({x: i, y: j});
      }
    }
}