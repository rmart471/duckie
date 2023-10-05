   import scheduler
   import tts_notifications
   import pomodoro_timer
   import user_interface

   def main():
       # Initialize the scheduler, notifications, and timer
       scheduler.init()
       tts_notifications.init()
       pomodoro_timer.init()

       # Start the user interface
       user_interface.start()

   if __name__ == "__main__":
       main()