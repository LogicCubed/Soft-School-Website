const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const { spawn } = require("child_process");
const path = require("path");
const waitOn = require("wait-on");

let serverProcess;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    minHeight: 400,
    frame: false,
    icon: path.join(__dirname, "../assets/icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  Menu.setApplicationMenu(null);
  win.loadURL("http://localhost:3000");
}

app.whenReady().then(async () => {
  serverProcess = spawn("npm", ["run", "start"], {
    shell: true,
    stdio: "inherit",
  });

  await waitOn({ resources: ["http://localhost:3000"] });

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
  if (serverProcess) serverProcess.kill();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on("window-minimize", (event) => {
  BrowserWindow.fromWebContents(event.sender).minimize();
});

ipcMain.on("window-maximize", (event) => {
  const win = BrowserWindow.fromWebContents(event.sender);
  win.isMaximized() ? win.unmaximize() : win.maximize();
});

ipcMain.on("window-close", (event) => {
  BrowserWindow.fromWebContents(event.sender).close();
});