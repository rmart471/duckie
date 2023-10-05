   import threading
   import time
   import tts_notifications
   import scheduler

   # The timer is a separate thread
   timer_thread = None

   def timer_function():
       # This function runs in the timer thread
       # ... existing code ...
       # At the end of each break, generate a TTS notification about the next task
       next_event = scheduler.get_next_event()
       tts_notifications.generate_notification("Your next task is: " + next_event)

   def start_timer():
       # Start the timer
       global timer_thread
       timer_thread = threading.Thread(target=timer_function)
       timer_thread.start()

   def stop_timer():
       # Stop the timer
       global timer_thread
       # ... existing code ...

   def reset_timer():
       # Reset the timer
       global timer_thread
       # ... existing code ...