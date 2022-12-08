function stopwatch(options) {
  //全体関数発動

  /////オブジェクト/////////////////////
  //---ウォッチ関連
  const waw = {
    /*  wa(tch) + w  */
    watcherId: null,
    time: 10000000, //全体タイム
    sto: 1, //0ウォッチ稼働、1ウォッチ停止
    timeElem: [], //[時間,分,秒]
    timeElem2: "",
    reload: () => {
      waw.timeElem[0] = Math.floor(waw.time / 10000) % 100;
      waw.timeElem[1] = Math.floor(waw.time / 100) % 100;
      waw.timeElem[2] = waw.time % 100;
      return waw.timeElem;
    },
    display: document.getElementById("display"),
    displayLoad: () => {
      waw.reload(); //[時間,分,秒]をwaw.timeElemへ装填（waw.time）
      waw.display = document.getElementById("display");
      waw.timeElem2 = timeJoin(waw.timeElem);
      waw.display.textContent = `${waw.timeElem2}`;
    }
  };

  //---ログ用
  const lol = {
    /*  lo(g) + l  */
    num: 0,
    now: new Date(),
    timeElem: [],
    timeElem2: "",
    logger: null,
    reload: () => {
      lol.now = new Date();
      lol.timeElem[0] = lol.now.getHours();
      lol.timeElem[1] = lol.now.getMinutes();
      lol.timeElem[2] = lol.now.getSeconds();
      return lol.timeElem;
    }
  };
  //////オブジェクト、ここまで///////////////////

  //////変数//////////////////////////////////
  //---効果音関連
  const audy = document.getElementById("timer_mp3");
  const audy2 = [
    document.getElementById("count_down_00_mp3"),
    document.getElementById("count_go_mp3")
  ];

  //---ボタンid取得用
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");

  //---ボリューム用
  const elem_volume = document.getElementById("volume");
  const elem_range = document.getElementById("vol_range");

  /////変数ここまで//////////////////////////

  /////関数////////////////////////////////
  //---ウォッチ用
  function workedWatch() {
    switch (
      waw.sto //ウォッチ稼働フラグ
    ) {
      case 0: //ウォッチ稼働
        waw.time++;
        if (waw.time % 100 > 59) {
          waw.time += 40; //60進法、秒
        }

        if (waw.time % 10000 > 5999) {
          waw.time += 4000; //60進法、分
        }

        waw.displayLoad();
        audio2();
        break;
      case 1: //ウォッチ停止
        //display.textContent = `${timeJoin(waw.timeElem)}`;
        break;
      default:
        break;
    }
  }
  //---ウォ用ここまで

  //---1桁→0入り2桁
  function timeJoin(timeArr) {
    timeArr = timeArr
      .map((e) => String(e))
      .map((e) => (e.length < 2 ? "0" + e : e));
    return timeArr.join(":");
  }
  //---1桁→0入り2桁関数、ここまで

  //---オーディオ用
  function audio() {
    audy.play();
    audy.addEventListener(
      "ended",
      () => {
        audy.currentTime = 0;
        switch (waw.sto) {
          case 0: //ウォッチ稼働
            audy.play();
            break;
          case 1: //ウォッチ停止
            audy.pause();
            break;
          default:
            break;
        }
      },
      false
    );
  }

  function audio2() {
    if (waw.time % 100 >= 50 && waw.time % 10 >= 7) {
      audy2[0].play();
      setTimeout(() => {
        audy2[0].pause();
        audy2[0].currentTime = 0;
      }, 900);
    }

    if (waw.time % 100 === 0 && waw.time % 10 === 0) {
      audy2[1].play();
    }
  }
  //---オーディオ用ここまで

  /////関数、ここまで///////////////////////////////////////////

  //////////////クラス導入/////////////////////////////////////

  //////タイム表示用クラス生成
  //------ログ用クラス生成
  class CreateLog {
    //---コンストラクタ//////////////
    constructor(num, timeElem) {
      this.num = num;
      this.timeElem = timeElem;
    }
    //--- */コンストラクタ、ここまで///////

    //---ログ選択用その1
    messageLog(sto, clas, select) {
      switch (sto) {
        case 0:
          this.create_p = document.createElement("p");
          this.create_p.classList = clas;
          this.create_p.innerText = this.results[select];
          this.anchor_div.append(this.create_p);
          console.log(this.create_p);
          break;
        case 1:
          this.create_p = document.querySelector(clas);
          this.create_p.textContent = `${this.results[select]}`;
          console.log(this.create_p);
          break;
        default:
          break;
      }
    }
    //---ログ選択用その1、ここまで

    //---ログ選択用その2
    result(sto) {
      lol.reload(); //[時間,分,秒]をlol.timeElemへ装填（new Date()）
      this.timeElem2 = timeJoin(lol.timeElem);
      this.results = [
        `${this.num} 開始  ${this.timeElem2}`,
        `　終了 ${this.timeElem2}`,
        `　経過 ${waw.timeElem2}`,
        `-----------------`
      ];
      switch (waw.sto) {
        case 0:
          this.anchor_div = document.createElement("div");
          this.anchor_div.classList = "anchor";
          this.log_list_section = document.querySelector("#log_list");
          this.log_list_section.prepend(this.anchor_div);

          this.messageLog(waw.sto, `start`, 0);
          this.messageLog(waw.sto, `stop`, 3);
          this.messageLog(waw.sto, `process`, 3);
          break;
        case 1:
          this.messageLog(waw.sto, `.stop`, 1);
          this.messageLog(waw.sto, `.process`, 2);
          break;
        default:
          break;
      }
    }
    //---ログ選択用その2、ここまで

    //---ログ打ち出し用関数
    outputLog() {
      switch (waw.sto) {
        case 0: //ウォッチ稼働
          this.result(0);
          break;
        case 1: //ウォッチ停止
          this.result(1);
          this.result(2);
          break;
        default:
          break;
      }
    }
  }
  //---ログ打ち出し用関数、ここまで
  //////ログ用クラス生成、ここまで

  /////////////////クラス導入、ここまで///////////////

  //////////////初期html操作/////////////////////////
  start.disabled = false;
  stop.disabled = true;
  waw.displayLoad();
  audy.volume = elem_volume.value;
  //////////////初期html操作ここまで///////////////////

  //-----イベント処理、スタートボタン
  start.addEventListener(
    "click",
    function () {
      start.disabled = true;
      stop.disabled = false;
      waw.time = 10000000;
      waw.sto = 0;
      waw.displayLoad();
      lol.now = new Date();
      lol.num++;
      if (waw.watcherId == null) {
        waw.watcherId = setInterval(workedWatch, 1000);
      }

      audio();
      ///ログ打ち出し、class導入///
      lol.logger = new CreateLog(lol.num, []);
      lol.logger.outputLog();
      ///ログ打ち出し、class導入、ここまで///
    },
    false
  );

  //-----イベント処理、ストップボタン
  stop.addEventListener(
    "click",
    function () {
      stop.disabled = true;
      start.disabled = false;
      waw.sto = 1; //ストップウォッチ停止状態
      lol.now = new Date();
      clearInterval(waw.watcherId);
      waw.watcherId = null;
      ///ログ打ち出し、class導入///
      lol.logger.outputLog();
      ///ログ打ち出し、class導入、ここまで///
    },
    false
  );

  //------イベント処理、ボリューム
  elem_volume.addEventListener(
    "change",
    function () {
      audy.volume = elem_volume.value;
      audy2[0].volume = elem_volume.value;
      audy2[1].volume = elem_volume.value;
      elem_range.textContent = elem_volume.value;
    },
    false
  );
  //----ここまで

  options = options || {};
  let color = options.color || "lightblue";
  let backgroundColor = options.backgroundColor || "black";
  waw.display.style.color = color;
  waw.display.style.backgroundColor = backgroundColor;
} //全体関数終了

const options = {
  color: "limegreen",
  backgroundColor: "#333333"
};

stopwatch(options);
