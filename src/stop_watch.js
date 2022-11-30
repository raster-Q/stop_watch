function stopwatch(options) {
  //関数発動

  //---変数
  const sss = {
    time: 0, //全体タイム
    sto: 1, //0ウォッチ運航、1ウォッチ停止
    hour10: 0, //時間10の位
    hour01: 0, //時間1の位
    min10: 0, //分10の位
    min01: 0, //分1の位
    sec10: 0, //秒10の位
    sec01: 0 //秒1の位
  };

  let watcherId = null;
  const audy = document.getElementById("timer_mp3");
  const audy2 = [
    document.getElementById("count_down_00_mp3"),
    document.getElementById("count_go_mp3")
  ];
  const display = document.getElementById("display");
  let start = document.getElementById("start");
  let stop = document.getElementById("stop");

  let elem_volume = document.getElementById("volume");
  let elem_range = document.getElementById("vol_range");

  const lll = {
    //ログ用
    log_start: [], //
    log_stop: [], //
    num: 0, //セット数
    now: new Date() //現在時刻取得
  };

  let create_p;
  const create_div = document.getElementById("log_list");

  //----変数ここまで

  //----関数
  //------タイマー用
  function watch() {
    if (sss.sto === 0) {
      sss.time++;
      if (Math.floor(sss.time / 10) % 10 > 5) {
        sss.time += 40; //60進法、秒
      }

      if (Math.floor(sss.time / 1000) % 10 > 5) {
        sss.time += 4000; //60進法、分
      }

      sss.sec01 = sss.time % 10;
      sss.sec10 = Math.floor(sss.time / 10) % 10;
      sss.min01 = Math.floor(sss.time / 100) % 10;
      sss.min10 = Math.floor(sss.time / 1000) % 10;
      sss.hour01 = Math.floor(sss.time / 10000) % 10;
      sss.hour10 = Math.floor(sss.time / 100000) % 10;
      display.textContent = `${sss.hour10}${sss.hour01}時${sss.min10}${sss.min01}分${sss.sec10}${sss.sec01}秒`;
      audio2();
    } else if (sss.sto === 1) {
      display.textContent = `${sss.hour10}${sss.hour01}時${sss.min10}${sss.min01}分${sss.sec10}${sss.sec01}秒`;
    }
  }
  //------タイマー用ここまで

  //------オーディオ用
  function audio() {
    //
    audy.play();
    audy.addEventListener(
      "ended",
      () => {
        audy.currentTime = 0;
        if (sss.sto === 0) {
          audy.play();
        } else {
          audy.pause();
        }
      },
      false
    );
  }

  function audio2() {
    if (sss.sec10 === 5 && sss.sec01 >= 7) {
      audy2[0].play();
      audy2.currentTime = 0;
      console.log(sss.sec01);
      setTimeout(() => {
        audy2[0].pause();
        audy2[0].currentTime = 0;
      }, 900);
    }

    if (sss.sec10 === 0 && sss.sec01 === 0) {
      audy2[1].play();
      audy2.currentTime = 0;
    }
  }
  //------オーディオ用ここまで

  //------ログ用
  function log() {
    //
    create_p = document.createElement("p");
    create_p.classList.add("log");
    if (sss.sto === 0) {
      lll.num++;
      create_p.innerText = `${lll.num} 開始 ${
        lll.now.getHours() < 10 ? "0" + lll.now.getHours() : lll.now.getHours()
      }:${
        lll.now.getMinutes() < 10
          ? "0" + lll.now.getMinutes()
          : lll.now.getMinutes()
      }.${
        lll.now.getSeconds() < 10
          ? "0" + lll.now.getSeconds()
          : lll.now.getSeconds()
      }`;
      create_div.append(create_p);
      console.log(create_p);
    } else {
      create_p.innerText = `　終了 ${
        lll.now.getHours() < 10 ? "0" + lll.now.getHours() : lll.now.getHours()
      }:${
        lll.now.getMinutes() < 10
          ? "0" + lll.now.getMinutes()
          : lll.now.getMinutes()
      }.${
        lll.now.getSeconds() < 10
          ? "0" + lll.now.getSeconds()
          : lll.now.getSeconds()
      }`;
      create_div.append(create_p);
      console.log(create_p);

      create_p = document.createElement("p");
      create_p.classList.add("log");
      create_p.innerText = `　経過 ${sss.hour10}${sss.hour01}:${sss.min10}${sss.min01}.${sss.sec10}${sss.sec01}`;
      create_div.append(create_p);
      console.log(create_p);
    }
  }
  //------ログ用ここまで

  //----関数ここまで

  //////////////初期html操作/////////////////////////
  start.disabled = false;
  stop.disabled = true;
  display.textContent = `${sss.hour10}${sss.hour01}時${sss.min10}${sss.min01}分${sss.sec10}${sss.sec01}秒`;
  audy.volume = elem_volume.value;
  //////////////初期html操作ここまで/////////////////////////

  //-----イベント処理、スタートボタン
  start.addEventListener("click", () => {
    start.disabled = true;
    stop.disabled = false;
    sss.time = 0;
    sss.sto = 0;
    sss.hour10 = 0;
    sss.hour01 = 0;
    sss.min10 = 0;
    sss.min01 = 0;
    sss.sec10 = 0;
    sss.sec01 = 0;
    display.textContent = `${sss.hour10}${sss.hour01}時${sss.min10}${sss.min01}分${sss.sec10}${sss.sec01}秒`;
    lll.now = new Date();

    if (watcherId == null) {
      watcherId = setInterval(watch, 1000);
    }
    audio();
    log();
  });

  //-----イベント処理、ストップボタン
  stop.addEventListener("click", () => {
    stop.disabled = true;
    start.disabled = false;
    sss.sto = 1;
    clearInterval(watcherId);
    watcherId = null;
    lll.now = new Date();
    log();
  });

  //------イベント、ボリューム
  elem_volume.addEventListener(
    "change",
    function () {
      audy.volume = elem_volume.value;
      elem_range.textContent = elem_volume.value;
    },
    false
  );
  //----ここまで

  options = options || {};
  let color = options.color || "lightblue";
  let backgroundColor = options.backgroundColor || "black";
  //const displayElm = document.getElementById('display');
  display.style.color = color;
  display.style.backgroundColor = backgroundColor;
} //関数終了

const options = {
  color: "limegreen",
  backgroundColor: "#333333"
};

stopwatch(options);
