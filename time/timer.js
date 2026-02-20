//htmlの情報を受け取る//
//htmlのIDを取得するためにgetElementByIdを使う
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const timeText = document.getElementById('timeText');
const progressCircle = document.getElementById('progressCircle');
const finishedMessage = document.getElementById('finishedMessage');
const clearButton = document.getElementById('clear-btn');
const stopButton = document.getElementById('stop-btn');

//グローバル変数の定義をする。
//タイマーの残り時間に変換する変数と、初期時間の変数、タイマーが動作中か判断する、タイマーの停止、時間に合わせた円長の定義
//タイマーの残り時間（秒）。分や時間を秒に変換する
let remainingTime = 0;
//タイマーの初期時間（秒）。進行率を計算するために使う
let initialTime = 0;
//タイマーが動作中かどうかを示す。falseなら停止中、trueなら動作中
let inOperation = false;
//タイマーを停止したときに、その時間を保存する変数
let stoppedRemainingTime = null;
//演習は2πr。r=140なので、2*3.14*140=880
const CIRCUMFERENCE = 880;

//タイマーを動かす関数の作成
//秒変換と初期時間・リセット時間と終了メッセージの非表示と動作中はinOperationをtrueにする
function startTimer() {
    if (inOperation) {
        return;
    }
    if (remainingTime === 0) {
        //入力欄の物を整数に変換するためにparseInt関数を使う。.valueは入力欄の値を取得するために使う。
        //もし入力欄が空欄の時は0を代入するために、||（または）を使う
        const hours = parseInt(hoursInput.value) || 0;
        const minutes = parseInt(minutesInput.value) || 0;
        const seconds = parseInt(secondsInput.value) || 0;
        //総秒数の計算をする
        remainingTime = hours * 3600 + minutes * 60 + seconds;
        //初期時間とリセットに使う
        initialTime = remainingTime;
    }
    //はじめから0秒以下なら、スタートしても意味がないので、何もしない
    if (remainingTime <= 0) {
        return;
    }
    //startTimer関数が実行されたら、タイマーが動作中と判断するためにinOperationをtrueにする
    inOperation = true;
    updateDisplay();
    //終了メッセージを非表示にするために、displayプロパティをnoneに設定する。
    // styleはCSSのプロパティを操作するために使う
    finishedMessage.style.display = 'none';
    //時間をカウントダウンする関数を1秒ごとに実行する
    //1秒ごとにcountDown関数を実行するためにsetInterval関数を使う。1000は1秒を意味する
    //setInterval関数は繰り返し実行する関数と時間を指定する。戻り値はタイマーIDで、後で停止するために使う。のちにclearInterval関数で停止するために、stoppedRemainingTime変数に保存する
    stoppedRemainingTime = setInterval(countDown, 1000);
}

//タイマーを動かすcountDown関数の作成
//remainingTimeを1秒ずつ減らし、時間表示と円の進行率を更新する
function countDown() {
    remainingTime -= 1;
    //時間が減るたびに表示を更新するためにupdateDisplay関数を呼び出す
    updateDisplay();
    //時間が0秒以下になったら、タイマーを停止するためにstopTimer関数を呼び出す
    if (remainingTime <= 0) {
        stopTimer();
        finishedMessage.style.display =  'block';
    }
    //終了メッセージを表示する
    //noneからblockに変更することで、終了メッセージを表示する
    
}

//タイマーを停止するstopTimer関数の作成
//inOperationをfalseにする、setIntervalを停止するためにclearInterval関数を使う、動いてたら何もしない
function stopTimer() {
    if (!inOperation) {
        return;
    }
    inOperation = false;
    clearInterval(stoppedRemainingTime);
    stopOrClearTimer();
}
//タイマーを0秒の時は消して、動いてないときは何もしないclearTimer関数の作成
function stopOrClearTimer() {
    if (inOperation) {
        stopButton.style.display = 'inline-block';
        clearButton.style.display = 'none';
    } else if (!inOperation) {
        stopButton.style.display = 'none';
        clearButton.style.display = 'inline-block';
    }
}
function clearTimer() {
    stopTimer();
    remainingTime = 0;
    initialTime = 0;
    updateDisplay();
    finishedMessage.style.display = 'none';
    stopOrClearTimer();
}

//タイマーをリセットするresetTimer関数の作成
//タイマーを停止する、セットした時間を秒に変換してinitialTimeにremainingTimeを代入する、画面を更新する、終了メッセージを非表示にする
function resetTimer() {
    stopTimer();
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    remainingTime = hours * 3600 + minutes * 60 + seconds;
    initialTime = remainingTime;
    updateDisplay();
    finishedMessage.style.display = 'none';
}

//時間の表示と円の進行率の更新をする。
//時間を計算するためにMath.floor関数を使う。Math.floorは小数点以下を切り捨てる関数。
//時間は全体の秒で割った端数切捨て、分は全体の秒で割ったあまりを60で割った端数切捨て、秒は全体の秒で割ったあまりを60で割ったあまりになる。
// 時間表示を更新するために、timeTextのtextContentプロパティを使う。円の進行率を更新するために、progressCircleのstyle.strokeDashoffsetプロパティを使う。進行率は残り時間を初期時間で割って、円周から引いた値になる。
function updateDisplay() {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor(remainingTime % 3600 /60);
    const seconds = remainingTime % 60;
    //時間を01のように表示したいのでString関数で文字列にして、文字列専用のpadStart関数で指定した長さになるまで左に0を追加する。padStart(長さ、追加する文字)
    const timeString = `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    //textContentは固有のプロパティで、HTML要素のテキストを更新する。
    timeText.textContent = timeString;

    //円の進行率の更新
    //残り時間を初期値でわるのでprogressは0.0から1.0の範囲で、1から0に減っていく。
    let progress = 0;
    //初期値に対して残り時間を割ることで円の進行率がわかる。
    if (initialTime > 0) {
        progress = remainingTime / initialTime;
    }
    //CIRCUMFERENCEは880で、progressは0.0から1.0の範囲なので、CIRCUMFERENCEに1からprogressを引いた値をかけると、円の周の長さから進行率に応じた長さが引かれる。0=880,1=0になる。
    const circle = CIRCUMFERENCE * (1 - progress);
    //cricleにたいしてprogressCircleのstroke-dashoffsetを更新して円が減っていく感じにする。
    //jsでcssのプロパティの操作をするときはキャメル形式で書く。
    progressCircle.style.strokeDashoffset = circle;
    //進行度に対して色を変える
    if (progress > 0.5) {
        progressCircle.style.stroke = 'rgb(40, 40, 232)';
    } else if (progress > 0.25) {
        progressCircle.style.stroke = 'rgb(235, 141, 25)';
    } else if (progress > 0.15) {
        progressCircle.style.stroke = 'rgb(223, 247, 9)';
    } else {
        progressCircle.style.stroke = 'rgb(255, 0, 0)';
    }
    stopOrClearTimer();
}
updateDisplay();