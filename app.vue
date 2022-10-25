<template>
  <div class="main-wrapper">
    <main class="flex flex-col items-center justify-center flex-grow max-w-xl mx-auto">
        <div class="flex flex-col items-center mb-20">
            <h1 class="text-5xl border-4 border-y-transparent border-x-red-500 rounded-l-full rounded-r-full p-4">Sequence Generator</h1>
          <small class="opacity-80 text-lg">randomized sequence patterns</small>
        </div>

          <form class="grid grid-cols-2 gap-4 items-center justify-items-center text-center w-full" @submit.prevent="handleClick">
            <label>Number of steps:</label>
            <input type="number" name="steps" min="0" max="100" v-model="stepCount">
            <label>Number of voices:</label>
            <input type="number" name="voices" min="0" max="100" v-model="voiceCount">
            <label>Handicap (0-1): <br><span class="opacity-70 text-sm">0 is least likely to be active</span></label>
            <input type="number" name="handicap" min="0" max="1" step="0.01" v-model="handicap">
            <div class="flex gap-8 items-center justify-center col-span-2">
              <input type="submit" class="bg-green-800 w-64 rounded-xl p-4 hover:bg-green-900 cursor-pointer" value="Generate">
              <div class="flex gap-2 mt-4">
                <div class="icon-button" @click="() => viewMode = 'line'">
                  <Icon name="ic:round-arrow-right-alt" size="28" class="icon" />
                  <small>line</small>
                </div>
                <div class="icon-button" @click="() => viewMode = 'grid'">
                  <Icon name="ic:sharp-grid-view" size="28" class="icon" />
                  <small>grid</small>
                </div>
              </div>
              <div class="icon-button mt-4" @click="() => sequences = []">
                <Icon name="ic:baseline-delete" size="28" class="icon" />
                <small>delete</small>
              </div>
            </div>
            <p :class="['text-red-600 col-span-2 error', error && 'active']" >{{errorMsg}}</p>
          </form>

          <div :class="['sequences-container', viewMode === 'grid' ? 'grid-mode' : 'line-mode']">
            <div v-for="sequence in sequences" :class="['sequence', viewMode === 'grid' ? 'grid-mode' : 'line-mode']">
                <span v-for="(item, idx) in sequence" :class="['blob', item <= 0 ? '' : 'bg-red-500']">{{idx+1}}</span>
            </div>
          </div>
    </main>

    <footer class="flex justify-center pb-16 pt-24 bg-gray-800">
      <NuxtLink to="https://www.lassekrarup.com/" class="opacity-60 hover:opacity-100">Lasse Krarup</NuxtLink>
    </footer>
  </div>
</template>

<script setup>
  const appConfig = useAppConfig()

  const stepCount = useState("stepCount", () => 16)
  const voiceCount = useState("voiceCount", () => 1)
  const error = useState("error", () => false)
  const errorMsg = useState("errorMsg", () => null)
  const sequences = useState("sequences", () => Array())
  const viewMode = useState("viewMode", () => "line")
  const handicap = useState("handicap", () => 1)

  useHead({title: appConfig.title})

  const handleClick = (e) => {
    if (stepCount.value < 1 || voiceCount.value < 1) {
      displayError("Step counter and voice counter must be at least 1")
      error.value = true;
    } else if (stepCount.value > 100 || voiceCount.value > 100) {
      displayError("Step counter or voice counter must be below 100")
      error.value = true;
    } 
    else {
      error.value = false;

      sequences.value.length = voiceCount.value
      
      sequences.value[0] = 1

      for (let i = 0; i < sequences.value.length; i++) {
        sequences.value[i] = generateSequence()
      }
    }
  }

  const displayError = (text) => {
    errorMsg.value = text
  }

  const generateSequence = () => {
    let sequence = Array(stepCount.value).fill(0)
    sequence.forEach( (i,index) => {
      sequence[index] = Math.round(Math.random() - ((1-handicap.value)*0.5))
    })

    return sequence
  }
</script>