const app = Vue.createApp({
  data() {
    return {
      msgToEncryptStone: '',
      msgToEncryptBronze: '',
      msgToEncryptIron: '',

      encryptStoneMsg: '',
      encryptBronzeMsg: '',
      encryptIronMsg: '',

      encryptStoneSteps: [],
      encryptBronzeSteps: [],
      encryptIronSteps: [],

      msgToDecryptStone: '',
      msgToDecryptBronze: '',
      msgToDecryptIron: '',

      decryptStoneMsg: '',
      decryptBronzeMsg: '',
      decryptIronMsg: '',

      decryptStoneSteps: [],
      decryptBronzeSteps: [],
      decryptIronSteps: [],

      enableDecrypt: false,

      bronzeRowNum: 5,

      secretCode: '',
      passcode: 'nicetry',
      taunts: [],

      stoneEncryptCount: 0,
      bronzeEncryptCount: 0,
      ironEncryptCount: 0,

      encryptLimit: 500,

      forbiddenDecryptMsg: 'Nice try! You\'re not allowed to decrypt any parts of the encrypted puzzles',

      puzzle1: 'puzzle1',
      puzzle2: 'puzzle2',

      selectedPuzzle: this.puzzle1,

      puzzles: {
        'puzzle1': {
          'msgs': [
            'saaah oonn tagennnadva erevov',
            'ehhht naaam ohhhw eseodo tooon',
            'ctdm\\a--*\\nrt*\\neh*\\oae*',
            'tao\\hn*\\e-*\\-w*\\mh*',
            'redob^a_oo^gdo^_k^s^'
          ],
          'final': 'oto-ebpttrr^nom\\o*hc*v^eirh\\to\\s^vvsy-lt*^goigt-@^nseho@^e*s-@^\\e-@^vt@^o@^@^'
        },
        'puzzle2': {
          'msgs': [
            'sttti rseracoa dnnna ghuuuro',
            'itee\\tsrr\\--ye\\gew*\\evh*',
            'arta\\nrin\\dind\\-tg*\\ia-*',
            'i_o_ed^dnl_@^tis@^ka@^n@^@^'
          ],
          'final': 'y-rie-fhm^teo-ybeh^t\\r\\tor^aeaub-^hh*i-^c\\ow^a*o^\\*^@^'
        }
      },
    }
  },

  created() {
    stoneEncryptCount = localStorage.getItem('stoneEncryptCount');
    bronzeEncryptCount = localStorage.getItem('bronzeEncryptCount');
    ironEncryptCount = localStorage.getItem('ironEncryptCount');
    this.stoneEncryptCount = stoneEncryptCount ? parseInt(stoneEncryptCount, 10) : 0;
    this.bronzeEncryptCount = bronzeEncryptCount ? parseInt(bronzeEncryptCount, 10) : 0;
    this.ironEncryptCount = ironEncryptCount ? parseInt(ironEncryptCount, 10) : 0;
  },

  methods: {

    checkCode(msg) {
      msg = this.formatEntry(msg)
      if (msg == 'please') {
        this.encryptLimit = 10000000
        this.taunts.push('well. not the right passcode but I\'ll give you more encryption guesses. Limit set to 10000000')
        return
      }
      if (msg == this.secretDecryption()) {
        this.enableDecrypt = true
        this.taunts.push('congrats, you are allowed to decrypt anything')
      } else {
        if (this.enableDecrypt) {
          this.taunts.push('congrats, you are no longer allowed to decrypt some stuff')
          this.passcode = 'ffooooll ooff aa ttooookk'
        } else {
          this.taunts.push(this.forbiddenDecryptMsg)
        }
        this.enableDecrypt = false
      }

    },

    preventCodeDecryption(decryptPhrase) {
      if (this.enableDecrypt) {
        return false
      }
      preventedPhrases = '\\ saaah oonn tagennnadva erevov ctdm\\a--*\\nrt*\\neh*\\oae ehhht naaam ohhhw eseodo tooon redob^a_oo^gdo^_k^s^ tao\\hn*\\e-*\\-w*\\mh* '
        + 'orytttvic ngsooobel oott ehhht stsomo eringvvvperse otnooe-mive\\rvgbohsonp*\\yisetht-ge*\\tcolthsevr*\\t-o--torvs* oto-ebpttrr^nom\\o*hc*v^eirh\\to\\s^vvsy-lt*^goigt-@^nseho@^e*s-@^\\e-@^vt@^o@^@^ '
        + 'sttti rseracoa dnnna ghuuuro itee\\tsrr\\--ye\\gew*\\evh* arta\\nrin\\dind\\-tg*\\ia-* i_o_ed^dnl_@^tis@^ka@^n@^@^ yaaam ehhht cerrrfo eebb thtiwi uoooy '
        + 'y-tretio\\ae-reh-y\\ahcfbtu*\\aheobio*\\mhr--wo* y-rie-fhm^teo-ybeh^t\\r\\tor^aeaub-^hh*i-^c\\ow^a*o^\\*^@^'
      preventedPhraseParts = preventedPhrases.split(' ')
      decryptPhraseParts = decryptPhrase.split(' ')
      for (i = 0; i < preventedPhraseParts.length; i++) {
        if (preventedPhraseParts.includes(decryptPhraseParts[i])) {
          console.log("ILLEGAL!")
          this.taunts.push('Not allowed to decrypt "' + decryptPhraseParts[i] + '"')
          return true
        }
      }
      return false
    },

    secretDecryption() {
      decryptedPassword = ''
      for (i = 0; i < this.passcode.length; i++) {
        if (i % 2 == 0 || this.passcode[i] == ' ') {
          decryptedPassword += this.passcode[i]
        }
      }
      return decryptedPassword
    },

    formatEntry(input) {
      return input.replace(/^\s+|\s+$/g, '').trim().toLowerCase();
    },

    encryptStone(msg) {
      this.stoneEncryptCount += 1;
      localStorage.setItem('stoneEncryptCount', this.stoneEncryptCount);
      msg = this.formatEntry(msg)
      this.msgToEncryptStone = msg
      this.encryptStoneSteps.push(msg)
      msgParts = msg.split(' ')
      encryptedWords = []
      msgParts.forEach((word) => {
        if (word.length % 2 == 0) {
          midLeftIndex = Math.floor((word.length - 1) / 2)
          alteredWord = word[midLeftIndex] + word + word[midLeftIndex + 1]
          alteredRightIndex = Math.floor((alteredWord.length - 1) / 2) + 1
          alteredWord = alteredWord.slice(alteredRightIndex) + alteredWord.slice(0, alteredRightIndex)

          encryptedWords.push(alteredWord)
        } else {
          midIndex = (word.length - 1) / 2
          alteredWord = word[midIndex] + word + word[midIndex]
          midIndex = (alteredWord.length - 1) / 2
          alteredWord = alteredWord.slice(midIndex + 1) + alteredWord[midIndex] + alteredWord.slice(0, midIndex)
          encryptedWords.push(alteredWord)
        }
      });
      this.encryptStoneMsg = encryptedWords.join(' ')
      this.encryptStoneSteps.push(this.encryptStoneMsg)
      this.msgToDecryptStone = this.encryptStoneMsg
    },

    decryptStone(msg) {
      msg = this.formatEntry(msg)
      this.msgToDecryptStone = msg
      if (this.preventCodeDecryption(msg)) {
        this.decryptStoneSteps.push(this.forbiddenDecryptMsg)
        return
      }
      this.decryptStoneSteps.push(msg)
      messageParts = msg.split(' ')
      decryptedWords = []
      messageParts.forEach((word) => {
        if (word.length % 2 == 0) {
          midRightIndex = Math.floor((word.length - 1) / 2) + 1
          alteredWord = word.slice(midRightIndex) + word.slice(0, midRightIndex)
          alteredWord = alteredWord.slice(1, -1)

          decryptedWords.push(alteredWord)
        } else {
          midIndex = (word.length - 1) / 2
          alteredWord = word.slice(midIndex + 1) + word[midIndex] + word.slice(0, midIndex)
          alteredWord = alteredWord.slice(1, -1)

          decryptedWords.push(alteredWord)
        }
      });
      this.decryptStoneMsg = decryptedWords.join(' ')
      this.decryptStoneSteps.push(this.decryptStoneMsg)
    },

    encryptBronze(msg) {
      this.bronzeEncryptCount += 1;
      localStorage.setItem('bronzeEncryptCount', this.bronzeEncryptCount);
      msg = this.formatEntry(msg)
      this.msgToEncryptBronze = msg
      this.encryptBronzeSteps.push(msg)
      msg = msg.replace(/ /g, '-')
      numRows = this.bronzeRowNum
      rows = []
      for (i = 0; i < numRows; i++) {
        rows.push('')
      }
      for (i = 0; i < msg.length; i++) {
        rows[i % numRows] += msg[i]
      }
      for (i = i % numRows; i < numRows; i++) {
        if (i == 0) {
          break
        }
        rows[i] += '*'
      }
      for (i = 0; i < numRows; i++) {
        this.encryptBronzeSteps.push(rows[i])
      }
      this.encryptBronzeMsg = rows.join('\\')
      this.encryptBronzeSteps.push(this.encryptBronzeMsg)
      this.msgToDecryptBronze = this.encryptBronzeMsg
    },

    decryptBronze(msg) {
      msg = this.formatEntry(msg)
      this.msgToDecryptBronze = msg
      if (this.preventCodeDecryption(msg)) {
        this.decryptBronzeSteps.push(this.forbiddenDecryptMsg)
        return
      }
      this.decryptBronzeSteps.push(msg)
      msg = msg.replaceAll('-', ' ')
      numRows = this.bronzeRowNum
      msgParts = msg.split('\\')
      newMsg = ''
      for (i = 0; i < msgParts[0].length; i++) {
        for (j = 0; j < numRows; j++) {
          newMsg += msgParts[j][i]
        }
      }
      newMsg = newMsg.replaceAll('*', '')
      this.decryptBronzeMsg = newMsg
      this.decryptBronzeSteps.push(newMsg)
    },

    encryptIron(msg) {
      this.ironEncryptCount += 1;
      localStorage.setItem('ironEncryptCount', this.ironEncryptCount);
      msg = this.formatEntry(msg)
      this.msgToEncryptIron = msg
      this.encryptIronSteps.push(msg)
      msg = msg.replace(/ /g, '_')
      rows = ['']
      rowIndex = 0
      rowCount = 0
      for (i = 0; i < msg.length; i++) {
        if (rowCount > rowIndex) {
          rows.push('')
          rowIndex += 1
          rowCount = 0
        }
        rows[rowIndex] += msg[i]
        rowCount++
      }
      for (i = rowCount; i < rowIndex + 1; i++) {
        rows[rowIndex] += '@'
      }
      for (i = 0; i <= rowIndex; i++) {
        this.encryptIronSteps.push(rows[i])
      }
      newMsg = ''
      for (i = 0; i < rows[rowIndex].length; i++) {
        for (j = i; j <= rowIndex; j++) {
          newMsg += rows[j][i]
        }
        newMsg += '^'
      }
      this.encryptIronMsg = newMsg
      this.encryptIronSteps.push(newMsg)
      this.msgToDecryptIron = newMsg
    },

    decryptIron(msg) {
      msg = this.formatEntry(msg)
      this.msgToDecryptIron = msg
      prevent = this.preventCodeDecryption(msg)
      if (prevent) {
        this.decryptIronSteps.push(this.forbiddenDecryptMsg)
        return
      }
      this.decryptIronSteps.push(msg)
      msg = msg.replaceAll('_', ' ')
      msgParts = msg.split('^')
      pyramidHeight = msgParts[0].length
      pyramidRows = []
      for (i = 0; i < pyramidHeight; i++) {
        pyramidRows.push('')
      }
      for (i = 0; i < msgParts.length; i++) {
        for (j = 0; j < msgParts[i].length; j++) {
          pyramidRows[i + j] += msgParts[i][j]
        }
      }
      for (i = 0; i < pyramidRows.length; i++) {
        this.decryptIronSteps.push(pyramidRows[i])
      }
      newMsg = pyramidRows.join('').replaceAll('@', '')
      this.decryptIronMsg = newMsg
      this.decryptIronSteps.push(newMsg)

    },

    copyToClipboard(step) {
      navigator.clipboard.writeText(step)
      console.log(step + " copied to clipboard")
    }
  },
  computed: {
  }
}
)

app.mount('#app')