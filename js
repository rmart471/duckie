document.addEventListener("DOMContentLoaded", function () {
  var orb = document.querySelector(".arc-reactor");
  var inputContainer = document.createElement("div");
  inputContainer.id = "input-container";
  inputContainer.innerHTML = '<input type="text" id="time-input" placeholder="Enter time (in minutes)">';

  var audio; // Variable to hold the currently playing audio
  var audioContext = new (window.AudioContext || window.webkitAudioContext)(); // Create an audio context

  orb.addEventListener("click", function () {
    inputContainer.style.display = "block";
    playRandomGreeting();
  });

  // Append the input container to the body
  document.body.appendChild(inputContainer);

  // Array of audio URLs
  var greetings = [
    "https://cdn.glitch.global/113e0d26-9b03-4ef9-82fc-5cfd75e36f59/At%20your%20service%201_Greetings.wav?v=1695679776632",
    "https://cdn.glitch.global/113e0d26-9b03-4ef9-82fc-5cfd75e36f59/Good%20day%20sir%20L%202.wav?v=1695679809922",
    "https://cdn.glitch.global/113e0d26-9b03-4ef9-82fc-5cfd75e36f59/Greetings%20sir%201.wav?v=1695679818593",
    // Add more audio URLs here
  ];

  // Function to play a random greeting
  function playRandomGreeting() {
    var randomIndex = Math.floor(Math.random() * greetings.length);
    audio = new Howl({
      src: [greetings[randomIndex]],
      onplay: startAnimation,
      onend: stopAnimation,
    });

    // Play the audio
    audio.play();
  }

  // Start the animation when audio plays
  function startAnimation() {
    orb.classList.add("speech-like-pulse");
    analyzeAudio();
  }

  // Stop the animation when audio ends
  function stopAnimation() {
    orb.classList.remove("speech-like-pulse");
  }

  // Analyze audio amplitude and adjust the animation
  function analyzeAudio() {
    var analyser = audioContext.createAnalyser();
    var source = audioContext.createMediaElementSource(audio._sounds[0]._node);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);

    function updateAnimation() {
      analyser.getByteFrequencyData(dataArray);
      var averageAmplitude = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;

      // Adjust the animation based on averageAmplitude
      var scaleFactor = 2.2 + averageAmplitude / 128; // Adjust as needed
      orb.style.transform = `scale(${scaleFactor})`;

      requestAnimationFrame(updateAnimation);
    }

    updateAnimation();
  }

  // Initialize the audio context
  audioContext.resume();
});
