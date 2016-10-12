/*
  vector.js
  常用二维三维矢量操作
  @author zichi
*/


/* 二维矢量类 */
function Vector2(x, y) {
  this.x = x || 0;
  this.y = y || 0;
}

Vector2.prototype.reset = function(x, y) {
  this.x = x || this.x;
  this.y = y || this.y;
};

Vector2.prototype.scale = function(s) {
  this.x *= s;
  this.y *= s;
};

Vector2.prototype.clone = function() {
  return new Vector2(this.x, this.y);
};

Vector2.prototype.add = function(v) {
  this.x += v.x;
  this.y += v.y;
};

Vector2.prototype.addNew = function(v) {
  return new Vector2(this.x + v.x, this.y + v.y);
};

Vector2.prototype.minus = function(v) {
  this.x -= v.x;
  this.y -= v.y;
};

Vector2.prototype.minusNew = function(v) {
  return new Vector2(this.x - v.x, this.y - v.y);
};

Vector2.prototype.getMid = function(v) {
  return new Vector2((this.x + v.x) / 2, (this.y + v.y) / 2);
};

// 向量点积得到夹角cos值，大于0为0~90度
Vector2.prototype.dot = function(v) {
  return this.x * v.x + this.y * v.y;
};

Vector2.prototype.length = function() {
  return Math.sqrt(this.sqrLength());
};

Vector2.prototype.sqrLength = function() {
  return this.x * this.x + this.y * this.y;
};

Vector2.prototype.getDistance = function(v) {
  var dis = (this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y);
  return Math.sqrt(dis);
};

// 标准化，单位长度为1
Vector2.prototype.normalize = function() {
  var inv = 1 / this.length();
  return new Vector2(this.x * inv, this.y * inv);
};

Vector2.prototype.getAngle = function() {
  return Math.atan2(this.y, this.x);
};



/* 三维矢量类 */
function Vector3(x, y, z) {
  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
}

Vector3.prototype.scale = function(s) {
  this.x *= s;
  this.y *= s;
  this.z *= s;
};

Vector3.prototype.reset = function(x, y, z) {
  this.x = x || this.x;
  this.y = y || this.y;
  this.z = z || this.z;
};

Vector3.prototype.clone = function() {
  return new Vector3(this.x, this.y, this.z);
};

Vector3.prototype.add = function(v) {
  this.x += v.x;
  this.y += v.y;
  this.z += v.z;
};

Vector3.prototype.addNew = function(v) {
  return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
};

Vector3.prototype.minus = function(v) {
  this.x -= v.x;
  this.y -= v.y;
  this.z -= v.z;
};

Vector3.prototype.minusNew = function(v) {
  return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
};

// 向量点积得到夹角cos值，大于0为0~90度
Vector3.prototype.dot = function(v) {
  return this.x * v.x + this.y * v.y + this.z * v.z;
};

Vector3.prototype.length = function() {
  return Math.sqrt(this.sqrLength());
};

Vector3.prototype.sqrLength = function() {
  return this.x * this.x + this.y * this.y + this.z * this.z;
};

Vector3.prototype.getDistance = function(v) {
  var dis = (this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y) + (this.z - v.z) * (this.z - v.z);
  return Math.sqrt(dis);
};

// 标准化，单位长度为1
Vector3.prototype.normalize = function() {
  var inv = 1 / this.length();
  return new Vector3(this.x * inv, this.y * inv, this.z * inv);
}

// 矢量旋转
Vector3.prototype.rotateX = function(angleX) {
  var cosx = Math.cos(angleX);
  var sinx = Math.sin(angleX);
  var y1 = this.y * cosx - this.z * sinx;
  var z1 = this.y * sinx + this.z * cosx;
  this.y = y1;
  this.z = z1;
};

Vector3.prototype.rotateY = function(angleY) {
  var cosy = Math.cos(angleY);
  var siny = Math.sin(angleY);
  var x1 = this.z * siny + this.x * cosy;
  var z1 = this.z * cosy - this.x * siny;
  this.x = x1;
  this.z = z1;
};

Vector3.prototype.rotateP = function(v, angleP) {
  var c = Math.cos(angleP);
  var s = Math.sin(angleP);
  // v为旋转轴单位向量
  var x = v.x;
  var y = v.y;
  var z = v.z;
  var new_x = (x * x * (1 - c) + c) * this.x + (x * y * (1 - c) - z * s) * this.y + (x * z * (1 - c) + y * s) * this.z;
  var new_y = (y * x * (1 - c) + z * s) * this.x + (y * y * (1 - c) + c) * this.y + (y * z * (1 - c) - x * s) * this.z;
  var new_z = (x * z * (1 - c) - y * s) * this.x + (y * z * (1 - c) + x * s) * this.y + (z * z * (1 - c) + c) * this.z;
  this.reset(new_x, new_y, new_z);
};