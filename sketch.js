// p5.jsで驚き盤再生
// by Toshio Iwai 2025

let img = []; //画像の配列をつくる
let imgNum = 0; //画像の番号

var slider;
let start_time;
let current_time;
let wait_time;

let button_text = ["<","START",">","NEXT"];
let button_width = [40,80,40,120,120];
let button_posx = [20,50,20];

let btn0;
let btn1;
let btn2;
let btn3;
let btn4;

let spin_flag = 0;

// 画像を読み込む
function preload() 
{
  img[0] = loadImage("phenakistiscope_face_1833_low.jpg"); 
  img[1] = loadImage("phena_iwai_horse_low.jpg"); 
  img[2] = loadImage("phena_iwai_copy_himo_low.jpg"); 
  img[3] = loadImage("phena_iwai_organic2_low.jpg"); 
  img[4] = loadImage("phena_iwai_computer03_low.jpg"); 
}

let t = 0;

function setup() 
{
  angleMode(DEGREES);
  createCanvas(windowWidth, windowHeight);
let col = color(100,100,100);
  
  i = 0;
  btn0 = createButton(button_text[i]);
  btn0.position(width/2+(i-1)*100-button_width[i]/2, width+90);
  btn0.size(button_width[i]);
  // ボタンサイズを変更
  btn0.style("width", "40px");
  btn0.style("height", "40px");
  btn0.style("border-radius", "10px");   // 角をまるく
//  btn0.style("font-family", "Osaka")
  btn0.style('font-size', '16px');
  btn0.style('color', col);
  btn0.mousePressed(step_back);

  i = 1;
  btn1 = createButton(button_text[i]);
  btn1.position(width/2+(i-1)*100-button_width[i]/2, width+90);
  btn1.size(button_width[i]);
  // ボタンサイズを変更
  btn1.style("width", "80px");
  btn1.style("height", "40px");
  btn1.style("border-radius", "10px");   // 角をまるく
  btn1.style('font-size', '16px');
  btn1.style('color', col);
  btn1.mousePressed(start_stop);

  i = 2;
  btn2 = createButton(button_text[i]);
  btn2.position(width/2+(i-1)*100-button_width[i]/2, width+90);
  btn2.size(button_width[i]);
  // ボタンサイズを変更
  btn2.style("width", "40px");
  btn2.style("height", "40px");
  btn2.style("border-radius", "10px");   // 角をまるく
  btn2.style('font-size', '16px');
  btn2.style('color', col);
  btn2.mousePressed(step_forward);

  i = 3;
  btn3 = createButton(button_text[i]);
  btn3.position(width/2-60, width+90+50);
  // ボタンサイズを変更
  btn3.style("width", "120px");
  btn3.style("height", "40px");
  btn3.style("border-radius", "10px");   // 角をまるく
  btn3.style('font-size', '16px');
  btn3.style('color', col);
  btn3.mousePressed(img_forward);

  slider = createSlider(0, 100, 70);
  slider.size(width*0.8);
  slider.position(width*0.1, width+60);

  start_time = millis()
  wait_time =(100-slider.value())*2;  

}

function draw() 
{
  background(0);

  push();
  
  translate(windowWidth/2,windowWidth/2+30); // 画面中央に移動
  
  scale(0.95*windowWidth/img[0].width); // 画像の横幅を画面に合わせる

  push();
  rotate(-t*30); //30度づつ回転
  
  // 驚き盤画像を描画 画像の中心を原点に
  image(img[imgNum], -img[0].width/2,-img[0].height/2);
  fill(100,100,100);
  circle(0, -img[0].height/2-10, 20);

  pop();

  fill(150, 150, 150);
  textSize(50);
  textAlign(CENTER, CENTER);
  textLeading(95);
  //文字を表示， "\n"で改行する
  if(imgNum == 0)
  {
    text("Phenakistiscope by S.W.Fores 1833", 0, img[0].height/2+70);
  }
  if(imgNum == 1)
  {
    text("Phenakistiscope by Toshio Iwai 1981", 0, img[0].height/2+70);
  }
  if(imgNum == 2)
  {
    text("Copy Phenakistiscope by Toshio Iwai 1982", 0, img[0].height/2+70);
  }
  if(imgNum == 3)
  {
    text("ORGANIC CRYSTAL II by Toshio Iwai 1982", 0, img[0].height/2+70);
  }
  if(imgNum == 4)
  {
    text("Computer Phenakistiscope by Toshio Iwai 1983", 0, img[0].height/2+70);
  }
  pop();
  
  if(spin_flag == 1)
  {
  // スライダーで待ち時間を決定
  wait_time =(100-slider.value())*2;  
  
  // 待ち時間を超えたかどうかをチェック
  current_time = millis();
  if(current_time > start_time + wait_time)
  {
    // 再生番号を更新
    t++;
    if(t>11) t = 0;
    start_time = millis()
  }
  }
}


function img_back()
{  
    imgNum--;
    if(imgNum < 0) imgNum = 1;
}

function img_forward()
{  
    imgNum++;
    if(imgNum > 4) imgNum = 0;
}

function step_forward()
{
    t--;
    if(t<0) t = 11;  
}

function step_back()
{
    t++;
    if(t>11) t = 0;
}

function start_stop()
{
  spin_flag++;
  if(spin_flag>1) spin_flag = 0;
  
  if(spin_flag == 0)
  {
    buttonLabel = "START";
    btn1.html(buttonLabel); // Change the button's HTML content
  }
  else
  {
    buttonLabel = "STOP";
    btn1.html(buttonLabel); // Change the button's HTML content
  }
}
