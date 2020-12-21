import KEYBOARD from '../../constants/keyboard';
import sprite from '../../assets/images/sprite.svg';

export default class Vkey {
  constructor(textAreaNode) {
    this.textAreaNode = document.querySelector(textAreaNode);
    this.initConstants();
  }

  initConstants() {
    this.REGISTR = 0; // 0 - нижний, 1 - верхний
    this.STORE = [];
    this.CAPS = false;
    this.CTRL = false;
    this.ALT = false;
    this.LANG = 'en';
    this.VKEY = null;
    this.VKEYBody = null;
    this.WidthRatio = [0.75, 1];
    this.ShiftCallBack = null;
    this.appFunctionsKeys = {};
    this.CAPSReactsButtons = [];
    this.textAreaNodeFontSize = 17;
    this.SoundSetting = false;
    this.recognition = null;
    this.microphoneKeyButton = null;
    this.microphoneRecordingLoader = null;
  }

  init() {
    this.createVkeyInBody();
    this.addAppEventListeners();
  }

  playSound(keyArg = 'default') {
    let key = keyArg;
    if (!this.SoundSetting) return false;
    const soundKeys = ['Shift', 'Caps', 'backspace', 'Enter', 'default', 'Del'];
    if (key) {
      if (soundKeys.findIndex((el) => el === key) === -1) key = 'default';
      const audio = new Audio(
        `./assets/audio/sound_${this.LANG}_${key.toLowerCase()}.mp3`
      );
      audio.play();
    }
    return this;
  }

  createVkeyInBody() {
    this.VKEY = document.createElement('div');
    this.VKEY.classList.add('vkey');
    this.VKEY.innerHTML = `<div class="vkey__wrapper">
        <header class="vkey__header">
          <div class="vkey__button vkey__button-service">
            <svg width="20" height="20">
              <use href="${sprite}#settings" />
            </svg>
          </div>
          <div class="vkey__button vkey__button-service vkey__button-service--audio" title="Включить / отключить звук нажатия клавиатуры">
            <svg width="20" height="20">
              <use xlink:href="${sprite}#audio-off" />
            </svg>
            <svg width="20" height="20">
              <use xlink:href="${sprite}#audio" />
            </svg>
          </div>
          <div class="vkey__button vkey__button-service vkey__button-service--microphone" title="Голосовой набор не включен. Нажмите для включения.">
            <svg width="20" height="20">
              <use xlink:href="${sprite}#microphone-off" />
            </svg>
            <svg width="20" height="20">
              <use xlink:href="${sprite}#microphone" />
            </svg>
          </div>
          <div class="vkey__recording"></div>
          <div class="vkey__button vkey__button-service vkey__button-close">
            <svg width="20" height="20">
              <use xlink:href="${sprite}#close" />
            </svg>
          </div>
        </header>
        <div class="vkey__body" data-symbol="0" data-caps="false"></div>
      </div>`;
    document.body.appendChild(this.VKEY);
    const keyboardRows = this.getVkeyRows();
    this.VKEYBody = this.VKEY.querySelector('.vkey__body');
    this.VKEYBody.appendChild(keyboardRows);
  }

  getVkeyRows() {
    const result = document.createDocumentFragment();
    KEYBOARD.forEach((row) => {
      const rowDivR = document.createElement('div');
      rowDivR.classList.add('vkey__row');
      row.forEach((btn) => {
        rowDivR.appendChild(this.getVkeyButton(btn));
      });
      result.appendChild(rowDivR);
    });
    return result;
  }

  getVkeyButton(btn) {
    const reverseRegistr = (smb) => {
      let res;
      if (smb === smb.toUpperCase()) res = smb.toLowerCase();
      if (smb === smb.toLowerCase()) res = smb.toUpperCase();
      return res;
    };
    switch (btn.type) {
      case 'symbol':
      case 'number':
        const innerHtml = document.createDocumentFragment();
        for (let i = 0; i < 4; i += 1) {
          const span = document.createElement('span');
          span.innerText = btn.symbol[i];
          innerHtml.appendChild(span);
        }
        const buttonS = document.createElement('div');
        buttonS.appendChild(innerHtml);
        buttonS.classList.add(
          'vkey__button',
          btn.type === 'symbol' ? 'vkey__button-symbol' : 'vkey__button-number'
        );
        if (btn.caps) {
          buttonS.setAttribute('data-reacts', 'caps');
          this.CAPSReactsButtons.push(buttonS);
        }
        if (btn.keycode) buttonS.setAttribute('data-keycode', btn.keycode);
        buttonS.addEventListener('click', () => {
          this.playSound('default');
          let symbol = btn.symbol[this.getCurrentKeyboardLayout()];
          if (this.ALT) {
            if (this.checkSymbol('-_=+', symbol)) {
              this.changeTextAreaNodeFontSize(
                symbol === '+' || symbol === '=' ? 1 : -1
              );
              this.saveAreaNodeFocus();
              // return false;
            } else this.changeAlt();
          }
          if (this.CTRL) {
            this.runCtrlFunctions(symbol);
          } else {
            if (this.CAPS) symbol = reverseRegistr(symbol);
            this.changeAreaNodeValue(symbol);
            if (this.ShiftCallBack) this.ShiftCallBack(null);
          }
        });
        return buttonS;
      case 'fkey':
        const buttonF = document.createElement('div');
        buttonF.classList.add('vkey__button', 'vkey__button-functionaly');
        if (typeof btn.name === 'object') {
          const innerHtmlF = document.createDocumentFragment();
          for (let i = 0; i < 4; i += 1) {
            const spanF = document.createElement('span');
            spanF.innerText = btn.name[i];
            innerHtmlF.appendChild(spanF);
          }
          buttonF.appendChild(innerHtmlF);
          buttonF.classList.add('vkey__button-functionaly--multy');
        } else {
          const icon = btn.icon
            ? `<svg width="20" height="20">
                <use xlink:href="${sprite}#${btn.icon}" />
              </svg>`
            : '';
          const name = btn.name ? `<span>${btn.name}</span>` : '';
          buttonF.innerHTML = icon + name;
        }
        if (btn.width) {
          const key = window.innerWidth < 768 ? 0 : 1;
          buttonF.style.width = `${this.WidthRatio[key] * btn.width} px`;
        }
        if (btn.keycode) buttonF.setAttribute('data-keycode', btn.keycode);
        let key = btn.name || btn.icon;
        if (!this.appFunctionsKeys[key]) this.appFunctionsKeys[key] = [];
        this.appFunctionsKeys[key].push(buttonF);
        buttonF.addEventListener('click', () => {
          if (typeof key === 'object') key = 'lang';
          this.setVkeyFunctionButtonsActions(key);
          this.playSound(key);
        });
        return buttonF;
      default:
        break;
    }
    return this;
  }

  checkSymbol(str, symbol) {
    let res = false;
    for (let i = 0; i < str.length; i += 1) {
      if (symbol === str[i]) {
        res = true;
        break;
      }
    }
    // eslint-disable-next-line no-console
    console.log('getHistoryGlobal', this.ALT);
    return res;
  }

  runCtrlFunctions(symbol) {
    const cursorPositionStart = this.textAreaNode.selectionStart;
    const cursorPositionEnd = this.textAreaNode.selectionEnd;

    const pasteText = (text) => {
      const after = this.textAreaNode.value.slice(0, cursorPositionStart);
      const before = this.textAreaNode.value.slice(cursorPositionEnd);
      this.textAreaNode.value = after + text + before;
      this.setSelectionPosition(cursorPositionEnd + text.length);
    };

    if (this.checkSymbol('cCсС', symbol) || this.checkSymbol('xXчЧ', symbol)) {
      const data = this.textAreaNode.value.slice(
        cursorPositionStart,
        cursorPositionEnd
      );
      if (!data) return false;
      this.STORE.push(data);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(data).catch((err) => {
          // eslint-disable-next-line no-console
          console.log('Something went wrong', err);
        });
      }
      if (this.checkSymbol('xXчЧ', symbol)) pasteText('');
    }
    if (this.checkSymbol('vVмМ', symbol)) {
      if (navigator.clipboard && navigator.clipboard.readText) {
        navigator.clipboard
          .readText()
          .then((text) => {
            pasteText(text);
          })
          .catch(() => {
            // eslint-disable-next-line no-alert
            alert(
              'Нет разрешения на данную операцию. Воспользуйтесь физической клавиатурой'
            );
          });
      } else if (this.STORE.length > 0) {
        pasteText(this.STORE[this.STORE.length - 1]);
      }
    }
    if (this.checkSymbol('-_=+', symbol)) {
      this.changeTextAreaNodeFontSize(
        symbol === '+' || symbol === '=' ? 2 : -2
      );
    }
    this.changeCtrl();
    return this;
  }

  changeTextAreaNodeFontSize(delta) {
    this.textAreaNodeFontSize += delta;
    this.textAreaNode.setAttribute(
      'style',
      `--fz: ${this.textAreaNodeFontSize}px`
    );
  }

  changeAreaNodeValue(symbol = null, delta = 0) {
    const cursorPosition = this.textAreaNode.selectionStart;
    if (symbol) {
      const prevValue = this.textAreaNode.value.slice(0, cursorPosition);
      const nextValue = this.textAreaNode.value.slice(cursorPosition);
      this.textAreaNode.value = prevValue + symbol + nextValue;
    }
    this.textAreaNode.focus();
    if (delta === 0) {
      this.textAreaNode.selectionEnd =
        cursorPosition + (symbol ? symbol.length : delta);
    } else if (this.REGISTR === 0) {
      if (this.textAreaNode.selectionStart === 0 && delta === -1) return false;
      this.setSelectionPosition(
        this.textAreaNode.selectionEnd,
        cursorPosition + (symbol ? symbol.length : delta)
      );
    } else if (delta > 0) {
      this.textAreaNode.selectionEnd += delta;
    } else if (this.textAreaNode.selectionStart > 0) {
      this.textAreaNode.selectionStart += delta;
    }
    return this;
  }

  saveAreaNodeFocus() {
    const cursorPositionStart = this.textAreaNode.selectionStart;
    const cursorPositionEnd = this.textAreaNode.selectionEnd;
    this.textAreaNode.focus();
    this.textAreaNode.selectionStart = cursorPositionStart;
    this.textAreaNode.selectionEnd = cursorPositionEnd;
  }

  toggleRegistr(cb, flag = true) {
    this.REGISTR = (this.REGISTR + 1) % 2;
    this.VKEYBody.setAttribute('data-symbol', this.getCurrentKeyboardLayout());
    if (cb) this.ShiftCallBack = cb;
    if (flag) {
      this.appFunctionsKeys.Shift.forEach((btn) => {
        btn.classList.toggle('active');
      });
    }
    if (this.REGISTR === 0) this.ShiftCallBack = null;
  }

  setVkeyFunctionButtonsActions(key) {
    const cursorPositionStart = this.textAreaNode.selectionStart;
    const cursorPositionEnd = this.textAreaNode.selectionEnd;
    switch (key) {
      case 'Esc':
        if (this.ALT) this.changeAlt();
        if (this.REGISTR === 1 && !!this.ShiftCallBack) this.toggleRegistr();
        if (this.CTRL) this.changeCtrl();
        if (this.CAPS) this.changeCapsReactsButtons();
        this.saveAreaNodeFocus();
        break;
      case 'Shift':
        this.toggleRegistr(!this.ShiftCallBack ? this.toggleRegistr : null);
        this.saveAreaNodeFocus();
        break;
      case 'lang':
        this.LANG = this.LANG === 'en' ? 'ru' : 'en';
        this.VKEYBody.setAttribute(
          'data-symbol',
          this.getCurrentKeyboardLayout()
        );
        this.saveAreaNodeFocus();
        break;
      case 'Caps':
        this.changeCapsReactsButtons();
        this.saveAreaNodeFocus();
        break;
      case 'Enter':
        if (cursorPositionStart !== cursorPositionEnd) {
          let result = '';
          result =
            this.textAreaNode.value.slice(0, cursorPositionStart) +
            this.textAreaNode.value.slice(cursorPositionEnd);
          this.textAreaNode.value = result;
          this.setSelectionPosition(cursorPositionStart);
        }
        this.changeAreaNodeValue('\n');
        break;
      case 'arrow-left':
        this.changeAreaNodeValue(null, -1);
        break;
      case 'arrow-right':
        this.changeAreaNodeValue(null, 1);
        break;
      case 'arrow-up':
        const rows = this.textAreaNode.value
          .slice(0, cursorPositionStart)
          .split('\n');
        let pos = 0;
        if (rows.length > 1) {
          if (rows[rows.length - 2].length > rows[rows.length - 1].length) {
            pos = cursorPositionStart - rows[rows.length - 2].length - 1;
          } else pos = cursorPositionStart - rows[rows.length - 1].length - 1;
        }
        this.setSelectionPosition(
          pos,
          this.REGISTR === 1 ? cursorPositionEnd : null
        );
        break;
      case 'arrow-down':
        const rowsBefore = this.textAreaNode.value
          .slice(0, cursorPositionEnd)
          .split('\n');
        const rowsAfter = this.textAreaNode.value
          .slice(cursorPositionEnd)
          .split('\n');
        let adPos = this.textAreaNode.value.length;
        if (rowsAfter.length > 1) {
          const length1 = rowsBefore[rowsBefore.length - 1].length;
          if (length1 > rowsAfter[1].length) {
            adPos =
              cursorPositionEnd + rowsAfter[0].length + rowsAfter[1].length + 1;
          } else adPos = cursorPositionEnd + rowsAfter[0].length + length1 + 1;
        }
        if (this.REGISTR === 1) {
          this.setSelectionPosition(cursorPositionStart, adPos);
        } else this.setSelectionPosition(adPos);

        break;
      case 'End':
        const rAfter = this.textAreaNode.value
          .slice(cursorPositionEnd)
          .split('\n');
        this.setSelectionPosition(
          this.textAreaNode.value.slice(0, cursorPositionEnd).length +
            rAfter[0].length
        );
        break;
      case 'Ctrl':
        this.changeCtrl();
        break;
      case 'Alt':
        this.changeAlt();
        break;
      case 'Tab':
        this.changeAreaNodeValue('\t');
        break;
      case 'backspace':
      case 'Del':
        const delta = key === 'backspace' ? -1 : 0;
        if (cursorPositionStart !== cursorPositionEnd) {
          this.textAreaNode.value =
            this.textAreaNode.value.slice(0, cursorPositionStart) +
            this.textAreaNode.value.slice(cursorPositionEnd);
          this.setSelectionPosition(cursorPositionStart, cursorPositionEnd);
        } else {
          this.textAreaNode.value =
            this.textAreaNode.value.slice(0, cursorPositionStart + delta) +
            this.textAreaNode.value.slice(cursorPositionEnd + 1 + delta);
          this.setSelectionPosition(
            cursorPositionStart + delta,
            cursorPositionEnd + delta
          );
        }
        this.saveAreaNodeFocus();
        break;
      default:
        break;
    }
  }

  setSelectionPosition(start = 0, endPos) {
    let end = endPos;
    if (!end) end = start;
    this.textAreaNode.selectionStart = start;
    this.textAreaNode.selectionEnd = end;
    this.saveAreaNodeFocus();
  }

  changeAlt() {
    this.ALT = !this.ALT;
    if (this.ALT) this.appFunctionsKeys.Alt[0].classList.add('active');
    else this.appFunctionsKeys.Alt[0].classList.remove('active');
    this.saveAreaNodeFocus();
  }

  changeCtrl() {
    this.CTRL = !this.CTRL;
    if (this.CTRL) this.appFunctionsKeys.Ctrl[0].classList.add('active');
    else this.appFunctionsKeys.Ctrl[0].classList.remove('active');
    this.saveAreaNodeFocus();
  }

  changeCapsReactsButtons() {
    this.CAPSReactsButtons.forEach((btn) => {
      const btnCRB = btn;
      for (let i = 0; i < 4; i += 1) {
        if (!this.CAPS) {
          btnCRB.children[i].innerText =
            i % 2 === 0
              ? btnCRB.children[i].innerText.toUpperCase()
              : btnCRB.children[i].innerText.toLowerCase();
        } else {
          btnCRB.children[i].innerText =
            i % 2 !== 0
              ? btnCRB.children[i].innerText.toUpperCase()
              : btnCRB.children[i].innerText.toLowerCase();
        }
      }
    });
    this.CAPS = !this.CAPS;
    this.appFunctionsKeys.Caps[0].classList.toggle('active');
  }

  stopRecognizer() {
    this.recognition.stop();
    this.microphoneKeyButton.classList.remove('is-active');
    this.microphoneRecordingLoader.innerText = '';
    this.microphoneRecordingLoader.classList.remove('active');
    const timerId = setTimeout(() => {
      this.recognition = null;
      clearTimeout(timerId);
    }, 500);
  }

  startRecognizer() {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (window.SpeechRecognition) {
      // eslint-disable-next-line
      this.recognition = new SpeechRecognition();
      this.recognition.lang = this.LANG === 'en' ? 'en' : 'ru';
      this.recognition.continuous = true;
      this.recognition.onresult = (event) => {
        const result = event.results[event.resultIndex];
        this.changeAreaNodeValue(result[0].transcript);
      };
      this.recognition.onend = () => {
        this.stopRecognizer();
      };
      this.recognition.start();
    } else alert('SpeechRecognition не поддерживается'); // eslint-disable-line no-alert
  }

  close() {
    this.VKEY.classList.remove('is-open');
  }

  addAppEventListeners() {
    // open vkey on focus
    this.textAreaNode.addEventListener('focus', () => {
      this.VKEY.classList.add('is-open');
    });
    // close vkey
    this.VKEY.querySelector('.vkey__button-close').addEventListener(
      'click',
      () => {
        this.VKEY.classList.remove('is-open');
      }
    );
    // sound key on / off
    const soundKeyButton = this.VKEY.querySelector(
      '.vkey__button-service--audio'
    );
    soundKeyButton.addEventListener('click', () => {
      soundKeyButton.classList.toggle('is-active');
      this.SoundSetting = !this.SoundSetting;
    });
    // вкл / откл записи с микрофона
    this.microphoneKeyButton = this.VKEY.querySelector(
      '.vkey__button-service--microphone'
    );
    this.microphoneRecordingLoader = this.VKEY.querySelector(
      '.vkey__recording'
    );
    this.microphoneKeyButton.addEventListener('click', () => {
      if (!this.recognition) {
        this.microphoneKeyButton.classList.add('is-active');
        this.microphoneRecordingLoader.innerText =
          this.LANG === 'en'
            ? 'Speak into the microphone'
            : 'Говорите в микрофон';
        this.microphoneRecordingLoader.classList.add('active');
        this.startRecognizer();
        this.saveAreaNodeFocus();
      } else this.stopRecognizer();
    });
    // подсветка вирт клав при нажатии реальной
    document.addEventListener('keydown', (e) => {
      const btn = this.VKEYBody.querySelectorAll(
        `[data-keycode="${e.keyCode}"]`
      );
      if (e.keyCode === 9) {
        e.preventDefault();
        this.setVkeyFunctionButtonsActions('Tab');
      }
      if (
        btn[0].classList.contains('vkey__button-symbol') ||
        btn[0].classList.contains('vkey__button-number')
      ) {
        let currentKeyboardLayout;
        for (let i = 0; i < btn[0].children.length; i += 1) {
          if (btn[0].children[i].innerText === e.key) {
            currentKeyboardLayout = i;
            break;
          }
        }
        if (
          currentKeyboardLayout &&
          currentKeyboardLayout !== this.getCurrentKeyboardLayout()
        ) {
          this.LANG = currentKeyboardLayout >= 2 ? 'ru' : 'en';
          this.VKEYBody.setAttribute(
            'data-symbol',
            this.getCurrentKeyboardLayout()
          );
        }
      }
      btn[0].classList.add('active');
      if (btn[1]) btn[1].classList.add('active');
    });
    document.addEventListener('keyup', (e) => {
      const btn = this.VKEYBody.querySelectorAll(
        `[data-keycode="${e.keyCode}"]`
      );
      btn[0].classList.remove('active');
      if (btn[1]) btn[1].classList.remove('active');
      if (e.keyCode === 17) this.CTRL = false;
    });
  }

  getCurrentKeyboardLayout() {
    return this.REGISTR + (this.LANG === 'en' ? 0 : 2);
  }
}
