window.canvas = document.createElement('canvas');
document.body.appendChild(window.canvas);
canvas.height = window.height = window.innerHeight;
canvas.width = window.width = window.innerWidth / 2;
window.ctx = canvas.getContext('2d');

ctx.font = '100px 微软雅黑 bold';
ctx.fillStyle = 'rgba(168,168,168,1)';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('loading...', width/2, height/2);