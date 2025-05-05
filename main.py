import subprocess
import webview
import webbrowser
import os


class API:
        def updateStatus(self, enable):
            """Enable or disable Windows Auto Update."""
            try:
                value = 0 if enable else 1
                subprocess.run(f'REG ADD "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU" /v NoAutoUpdate /t REG_DWORD /d {value} /f', shell=True)
                return ("Windows Update has been enabled\nPlease restart your computer.") if enable else "Auto Update has been disabled."
            except Exception as e:
                return f"Error: {str(e)}"

        def updateStatus(self, enable):
            import subprocess
            try:
                value = 0 if enable else 1
                subprocess.run(
                    f'REG ADD "HKLM\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\AU" /v NoAutoUpdate /t REG_DWORD /d {value} /f',
                    shell=True)
                return "Windows Update has been enabled\nPlease restart your computer." if enable else "Auto Update has been disabled."
            except Exception as e:
                return f"Error: {str(e)}"

        def exitApp(self):

            os._exit(0)

        def github(self):
            webbrowser.open('https://github.com/0CapTaiN0/Noup')



    # Create the window with API and frameless
webview.create_window("Noup", "web/index.html", width=300, height=400, js_api=API(), resizable=False, frameless=True)
webview.start()
