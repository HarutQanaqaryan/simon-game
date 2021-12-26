<template>
  <div class="simon-wrapper">
    <div class="simon-game">
      <div class="simon-left-side">
        <div
          class="simon-left-top"
          :class="isRed && 'clicked-left-top clicked-style'"
          @click="handleClick"
          id="1"
        ></div>
        <div
          class="simon-left-bottom"
          :class="isYellow && 'clicked-left-bottom clicked-style'"
          @click="handleClick"
          id="2"
        ></div>
      </div>
      <div class="simon-center">
        <div class="simon-center_min">
          <h2 class="simon-title">SIMON</h2>
          <div class="simon-levels">
            <span>
              <p class="simon-level-title">Легкий</p>
              <button
                class="simon-level_btn"
                @click="complexity = 1500"
                :class="complexity === 1500 && 'clicked-level-btn'"
              ></button>
            </span>
            <span>
              <p class="simon-level-title">Средний</p>
              <button
                class="simon-level_btn"
                @click="complexity = 1000"
                :class="complexity === 1000 && 'clicked-level-btn'"
              ></button>
            </span>
            <span>
              <p class="simon-level-title">Сложный</p>
              <button
                class="simon-level_btn"
                @click="complexity = 400"
                :class="complexity === 400 && 'clicked-level-btn'"
              ></button>
            </span>
          </div>
          <span class="simon-start-points">
            <span class="simon-start" @click="startGame">Старт</span>
            <span class="simon-steps">{{ count }}</span>
          </span>
        </div>
      </div>
      <div class="simon-right-side">
        <div
          class="simon-right-top"
          :class="isBlue && 'clicked-right-top clicked-style'"
          @click="handleClick"
          id="3"
        ></div>
        <div
          class="simon-right-bottom"
          :class="isGreen && 'clicked-right-bottom clicked-style'"
          @click="handleClick"
          id="4"
        ></div>
      </div>
    </div>
    <div class="lost-modal" v-if="lost">
      <p>Проиграли :(</p>
      <span class="lost-btn" @click="lost = !lost">Начать заново</span>
    </div>
  </div>
</template>

<script>
import { clickedBlocks } from "../helpers/blocks";
import stepSound from "../assets/step.wav";
import lostSound from "../assets/lost.wav"

let stepsAudio = new Audio(stepSound);
let lostAudio = new Audio(lostSound);
let intervalFn = null;

export default {
  data() {
    return {
      clickedBlocks,
      playerSteps: [],
      compSteps: [],
      isRed: clickedBlocks[0].isClicked,
      isYellow: clickedBlocks[1].isClicked,
      isBlue: clickedBlocks[2].isClicked,
      isGreen: clickedBlocks[3].isClicked,
      count: 1,
      spareCount: 0,
      lost: false,
      complexity: 1500,
      randomId: null,
    }
  },
  methods: {
    handleClick({ target: { id } }) {
      this.playerSteps.push(id)
      this.checkingStepBlock(id)
      stepsAudio.play()
      this.checkWin()
      this.checkLost()
    },
    playGame() {
      this.randomId = clickedBlocks[Math.floor(Math.random() * 4)].block
      this.compSteps.push(this.randomId)
      this.spareCount = this.spareCount - 1
      if (this.spareCount <= 0) {
        clearInterval(intervalFn)
      }
      this.checkingStepBlock(this.randomId)
      stepsAudio.play()
    },
    startGame() {
      this.spareCount = this.count
      this.playerSteps = [];
      this.compSteps = [];
      intervalFn = setInterval(this.playGame, this.complexity)
    },
    checkingStepBlock(id) {
      switch (id) {
        case "1":
          this.isRed = !this.isRed
          setTimeout(() => {
            this.isRed = !this.isRed
          }, 250)
          break;
        case "2":
          this.isYellow = !this.isYellow
          setTimeout(() => {
            this.isYellow = !this.isYellow
          }, 250)

          break;
        case "3":
          this.isBlue = !this.isBlue
          setTimeout(() => {
            this.isBlue = !this.isBlue
          }, 250)
          break;
        case "4":
          this.isGreen = !this.isGreen
          setTimeout(() => {
            this.isGreen = !this.isGreen
          }, 250)

          break;
        default:
          return
      }
    },
    checkWin() {
      if (this.compSteps.join("") === this.playerSteps.join("")) {
        this.count = this.count + 1;
        this.spareCount = this.count;
        this.startGame()
      } else {
        return false
      }
      if (this.compSteps.length === this.playerSteps.length) {
        this.playerSteps = [];
        this.compSteps = [];
      }
    },
    checkLost() {
      if (this.compSteps.length === this.playerSteps.length && this.compSteps.join("") !== this.playerSteps.join("")) {
        this.lost = !this.lost
        lostAudio.play()
      }
      if (this.playerSteps.length > this.compSteps.length) {
        this.lost = !this.lost
        lostAudio.play()
      }
      if (this.lost === true) {
        this.count = 1;
        this.spareCount = this.count
        this.playerSteps = [];
        this.compSteps = [];
      }
    }
  }
}

</script>

