import { BrowserWindow } from "electron"

export function minimize() {
  const window = BrowserWindow.getFocusedWindow()
  if (window) window.minimize()
}

export function closeWindow() {
  const window = BrowserWindow.getFocusedWindow()
  if (window) window.close()
}
