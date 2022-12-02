function stopwatch(options) {
  //関数発動

  /////変数
  //---ウォッチ関連
  let watcherId = null;
  const waw = {
    //wa(tch) + w
    time: 0, //全体タイム
    sto: 1, //0ウォッチ運航、1ウォッチ停止
    hour10: 0, //時間10の位
    hour01: 0, //時間1の位
    min10: 0, //分10の位
    min01: 0, //分1の位
    sec10: 0, //秒10の位
    sec01: 0 //秒1の位
  };
  const display = document.getElementById("display");

  //---効果音関連
  const audy = document.getElementById("timer_mp3");
  const audy2 = [
    document.getElementById("count_down_00_mp3"),
    document.getElementById("count_go_mp3")
  ];

  //---ボタンid取得用
  let start = document.getElementById("start");
  let stop = document.getElementById("stop");

  //---ボリューム用
  let elem_volume = document.getElementById("volume");
  let elem_range = document.getElementById("vol_range");

  //---ログ用
  const lol = {
    //lo(g) + l
    num: 0, //セット数
    now: new Date() //現在時刻取得
  };
  let create_p; //createElement用
  const create_div = document.getElementById("log_list");
  /////変数ここまで

  /////関数
  //---タイマー用
  function disp_watchw() {
    if (waw.sto === 0) {
      waw.time++;
      if (Math.floor(waw.time / 10) % 10 > 5) {
        waw.time += 40; //60進法、秒
      }

      if (Math.floor(waw.time / 1000) % 10 > 5) {
        waw.time += 4000; //60進法、分
      }

      waw.sec01 = waw.time % 10;
      waw.sec10 = Math.floor(waw.time / 10) % 10;
      waw.min01 = Math.floor(waw.time / 100) % 10;
      waw.min10 = Math.floor(waw.time / 1000) % 10;
      waw.hour01 = Math.floor(waw.time / 10000) % 10;
      waw.hour10 = Math.floor(waw.time / 100000) % 10;
      display.textContent = `${waw.hour10}${waw.hour01}時${waw.min10}${waw.min01}分${waw.sec10}${waw.sec01}秒`;
      audio2();
    } else if (waw.sto === 1) {
      display.textContent = `${waw.hour10}${waw.hour01}時${waw.min10}${waw.min01}分${waw.sec10}${waw.sec01}秒`;
    }
  }
  //---タイマー用ここまで

  //---オーディオ用
  function audio() {
    //
    audy.play();
    audy.addEventListener(
      "ended",
      () => {
        audy.currentTime = 0;
        if (waw.sto === 0) {
          audy.play();
        } else {
          audy.pause();
        }
      },
      false
    );
  }

  function audio2() {
    if (waw.sec10 === 5 && waw.sec01 >= 7) {
      audy2[0].play();
      audy2.currentTime = 0;
      console.log(waw.sec01);
      setTimeout(() => {
        audy2[0].pause();
        audy2[0].currentTime = 0;
      }, 900);
    }

    if (waw.sec10 === 0 && waw.sec01 === 0) {
      audy2[1].play();
      audy2.currentTime = 0;
    }
  }
  //---オーディオ用ここまで

  //---ログ用
  function disp_log() {
    //////入れご関数/////////////
    function get_time() {
      //現在時刻取得用

      function retime(check) {
        //1桁数値を0入り2桁へ
        return check < 10 ? "0" + check : check;
      }

      return `${retime(lol.now.getHours())}:${retime(
        lol.now.getMinutes()
      )}.${retime(lol.now.getSeconds())}`;
    }
    //////入れご関数、ここまで//////

    create_p = document.createElement("p");
    create_p.classList.add("log");

    if (waw.sto === 0) {
      lol.num++;
      create_p.innerText = `${lol.num} 開始 ${get_time()}`;
      create_div.append(create_p);
      console.log(create_p);
    } else {
      create_p.innerText = `　終了 ${get_time()}`;
      create_div.append(create_p);
      console.log(create_p);

      create_p = document.createElement("p");
      create_p.classList.add("log");
      create_p.innerText = `　経過 ${waw.hour10}${waw.hour01}:${waw.min10}${waw.min01}.${waw.sec10}${waw.sec01}`;
      create_div.append(create_p);
      console.log(create_p);
    }
  }
  //------ログ用ここまで

  /////関数ここまで

  //////////////初期html操作/////////////////////////
  start.disabled = false;
  stop.disabled = true;
  display.textContent = `${waw.hour10}${waw.hour01}時${waw.min10}${waw.min01}分${waw.sec10}${waw.sec01}秒`;
  audy.volume = elem_volume.value;
  //////////////初期html操作ここまで/////////////////////////

  //-----イベント処理、スタートボタン
  start.addEventListener("click", () => {
    start.disabled = true;
    stop.disabled = false;
    waw.time = 0;
    waw.sto = 0;
    waw.hour10 = 0;
    waw.hour01 = 0;
    waw.min10 = 0;
    waw.min01 = 0;
    waw.sec10 = 0;
    waw.sec01 = 0;
    display.textContent = `${waw.hour10}${waw.hour01}時${waw.min10}${waw.min01}分${waw.sec10}${waw.sec01}秒`;
    lol.now = new Date();

    if (watcherId == null) {
      watcherId = setInterval(disp_watchw, 1000);
    }
    audio();
    disp_log();
  });

  //-----イベント処理、ストップボタン
  stop.addEventListener("click", () => {
    stop.disabled = true;
    start.disabled = false;
    waw.sto = 1; //ストップウォッチ停止状態
    clearInterval(watcherId);
    watcherId = null;
    lol.now = new Date();
    disp_log();
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
  display.style.color = color;
  display.style.backgroundColor = backgroundColor;
} //関数終了

const options = {
  color: "limegreen",
  backgroundColor: "#333333"
};

stopwatch(options);
