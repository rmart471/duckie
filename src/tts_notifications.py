   import pyttsx3

   engine = pyttsx3.init()

   def init():
       # Set the voice to a male voice
       voices = engine.getProperty('voices')
       for voice in voices:
           if voice.gender == 'male':
               engine.setProperty('voice', voice.id)
               break

   def generate_notification(message):
       # Generate a TTS notification
       engine.say(message)
       engine.runAndWait()