var pxtTargetBundle = {
  "id": "arcadia",
  "name": "Arcadia",
  "title": "Marker-based Augmented Reality Code Editor",
  "corepkg": "core",
  "cloud": {
    "workspace": false,
    "packages": false,
    "sharing": false,
    "publishing": true,
    "importing": false,
    "preferredPackages": [],
    "githubPackages": false
  },
  "bundleddirs": [
    "libs/core"
  ],
  "runtime": {
    "mathBlocks": true,
    "loopsBlocks": true,
    "logicBlocks": true,
    "variablesBlocks": true,
    "textBlocks": true,
    "listsBlocks": true,
    "functionBlocks": true,
    "musicBlocks": true
  },
  "simulator": {
    "autoRun": true,
    "aspectRatio": 1
  },
  "appTheme": {
    "logoUrl": "/arcadia/",
    "homeUrl": "/arcadia/",
    "betaUrl": "https://laboratoryforplayfulcomputation.github.io/arcadia/",
    "githubUrl": "https://github.com/LaboratoryForPlayfulComputation/arcadia",
    "logo": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMzAwbW0iCiAgIGhlaWdodD0iMzAwbW0iCiAgIHZpZXdCb3g9IjAgMCAzMDAgMzAwIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmczNjg2IgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIgogICBzb2RpcG9kaTpkb2NuYW1lPSJhdmF0YXIuc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMzY4MCIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMS4wMjk4NjExIgogICAgIGlua3NjYXBlOmN4PSI0NzAuMTYyNTEiCiAgICAgaW5rc2NhcGU6Y3k9IjUwMS41OTY2MiIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjI4ODAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTcwNiIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTExIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItMTEiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIgLz4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGEzNjgzIj4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZSAvPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZwogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMiIKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMiIgLz4KICA8ZwogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDMpIj4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO3N0cm9rZS13aWR0aDowLjI2NDI5Mzc5IgogICAgICAgaWQ9InJlY3QyNCIKICAgICAgIHdpZHRoPSIzMDAiCiAgICAgICBoZWlnaHQ9IjMwMCIKICAgICAgIHg9IjEuMTEwMjIzZS0wMTUiCiAgICAgICB5PSItMyIgLz4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO3N0cm9rZS13aWR0aDowLjI2NDU4MzMyIgogICAgICAgaWQ9InJlY3QzNzc3IgogICAgICAgd2lkdGg9IjI2NC41ODMzNyIKICAgICAgIGhlaWdodD0iMjY0LjU4MzM3IgogICAgICAgeD0iMTcuNzA4MzEzIgogICAgICAgeT0iMTQuNzA4MzEzIiAvPgogICAgPHJlY3QKICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjAuNDAzMTkxMTgiCiAgICAgICBpZD0icmVjdDM3MzYiCiAgICAgICB3aWR0aD0iNjYuODI5ODExIgogICAgICAgaGVpZ2h0PSI2OS4xMjI1NDMiCiAgICAgICB4PSI0OC4wNjQxMzciCiAgICAgICB5PSIxMTIuMDc1MTkiIC8+CiAgICA8cmVjdAogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MC41NzA1NDk3MyIKICAgICAgIGlkPSJyZWN0MzczNi0zIgogICAgICAgd2lkdGg9IjEzOC4wMDM3OCIKICAgICAgIGhlaWdodD0iNjcuMDI5MTkiCiAgICAgICB4PSIxMTUuMDk2NDgiCiAgICAgICB5PSI0NC45Njk2NjYiIC8+CiAgICA8cmVjdAogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MC40MDk0NTcxNSIKICAgICAgIGlkPSJyZWN0MzczNi0zLTMiCiAgICAgICB3aWR0aD0iNjguOTIzMTcyIgogICAgICAgaGVpZ2h0PSI2OS4xMjI1NDMiCiAgICAgICB4PSIxODQuMjc2NzYiCiAgICAgICB5PSIxODEuMDg3MzkiIC8+CiAgPC9nPgo8L3N2Zz4K",
    "docsLogo": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMzAwbW0iCiAgIGhlaWdodD0iMzAwbW0iCiAgIHZpZXdCb3g9IjAgMCAzMDAgMzAwIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmczNjg2IgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIgogICBzb2RpcG9kaTpkb2NuYW1lPSJhdmF0YXIuc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMzY4MCIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMS4wMjk4NjExIgogICAgIGlua3NjYXBlOmN4PSI0NzAuMTYyNTEiCiAgICAgaW5rc2NhcGU6Y3k9IjUwMS41OTY2MiIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjI4ODAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTcwNiIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTExIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItMTEiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIgLz4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGEzNjgzIj4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZSAvPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZwogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMiIKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMiIgLz4KICA8ZwogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDMpIj4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO3N0cm9rZS13aWR0aDowLjI2NDI5Mzc5IgogICAgICAgaWQ9InJlY3QyNCIKICAgICAgIHdpZHRoPSIzMDAiCiAgICAgICBoZWlnaHQ9IjMwMCIKICAgICAgIHg9IjEuMTEwMjIzZS0wMTUiCiAgICAgICB5PSItMyIgLz4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO3N0cm9rZS13aWR0aDowLjI2NDU4MzMyIgogICAgICAgaWQ9InJlY3QzNzc3IgogICAgICAgd2lkdGg9IjI2NC41ODMzNyIKICAgICAgIGhlaWdodD0iMjY0LjU4MzM3IgogICAgICAgeD0iMTcuNzA4MzEzIgogICAgICAgeT0iMTQuNzA4MzEzIiAvPgogICAgPHJlY3QKICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjAuNDAzMTkxMTgiCiAgICAgICBpZD0icmVjdDM3MzYiCiAgICAgICB3aWR0aD0iNjYuODI5ODExIgogICAgICAgaGVpZ2h0PSI2OS4xMjI1NDMiCiAgICAgICB4PSI0OC4wNjQxMzciCiAgICAgICB5PSIxMTIuMDc1MTkiIC8+CiAgICA8cmVjdAogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MC41NzA1NDk3MyIKICAgICAgIGlkPSJyZWN0MzczNi0zIgogICAgICAgd2lkdGg9IjEzOC4wMDM3OCIKICAgICAgIGhlaWdodD0iNjcuMDI5MTkiCiAgICAgICB4PSIxMTUuMDk2NDgiCiAgICAgICB5PSI0NC45Njk2NjYiIC8+CiAgICA8cmVjdAogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MC40MDk0NTcxNSIKICAgICAgIGlkPSJyZWN0MzczNi0zLTMiCiAgICAgICB3aWR0aD0iNjguOTIzMTcyIgogICAgICAgaGVpZ2h0PSI2OS4xMjI1NDMiCiAgICAgICB4PSIxODQuMjc2NzYiCiAgICAgICB5PSIxODEuMDg3MzkiIC8+CiAgPC9nPgo8L3N2Zz4K",
    "portraitLogo": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMzAwbW0iCiAgIGhlaWdodD0iMzAwbW0iCiAgIHZpZXdCb3g9IjAgMCAzMDAgMzAwIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmczNjg2IgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIgogICBzb2RpcG9kaTpkb2NuYW1lPSJhdmF0YXIuc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMzY4MCIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMS4wMjk4NjExIgogICAgIGlua3NjYXBlOmN4PSI0NzAuMTYyNTEiCiAgICAgaW5rc2NhcGU6Y3k9IjUwMS41OTY2MiIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjI4ODAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTcwNiIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTExIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItMTEiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIgLz4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGEzNjgzIj4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZSAvPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZwogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMiIKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMiIgLz4KICA8ZwogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDMpIj4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO3N0cm9rZS13aWR0aDowLjI2NDI5Mzc5IgogICAgICAgaWQ9InJlY3QyNCIKICAgICAgIHdpZHRoPSIzMDAiCiAgICAgICBoZWlnaHQ9IjMwMCIKICAgICAgIHg9IjEuMTEwMjIzZS0wMTUiCiAgICAgICB5PSItMyIgLz4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO3N0cm9rZS13aWR0aDowLjI2NDU4MzMyIgogICAgICAgaWQ9InJlY3QzNzc3IgogICAgICAgd2lkdGg9IjI2NC41ODMzNyIKICAgICAgIGhlaWdodD0iMjY0LjU4MzM3IgogICAgICAgeD0iMTcuNzA4MzEzIgogICAgICAgeT0iMTQuNzA4MzEzIiAvPgogICAgPHJlY3QKICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjAuNDAzMTkxMTgiCiAgICAgICBpZD0icmVjdDM3MzYiCiAgICAgICB3aWR0aD0iNjYuODI5ODExIgogICAgICAgaGVpZ2h0PSI2OS4xMjI1NDMiCiAgICAgICB4PSI0OC4wNjQxMzciCiAgICAgICB5PSIxMTIuMDc1MTkiIC8+CiAgICA8cmVjdAogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MC41NzA1NDk3MyIKICAgICAgIGlkPSJyZWN0MzczNi0zIgogICAgICAgd2lkdGg9IjEzOC4wMDM3OCIKICAgICAgIGhlaWdodD0iNjcuMDI5MTkiCiAgICAgICB4PSIxMTUuMDk2NDgiCiAgICAgICB5PSI0NC45Njk2NjYiIC8+CiAgICA8cmVjdAogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MC40MDk0NTcxNSIKICAgICAgIGlkPSJyZWN0MzczNi0zLTMiCiAgICAgICB3aWR0aD0iNjguOTIzMTcyIgogICAgICAgaGVpZ2h0PSI2OS4xMjI1NDMiCiAgICAgICB4PSIxODQuMjc2NzYiCiAgICAgICB5PSIxODEuMDg3MzkiIC8+CiAgPC9nPgo8L3N2Zz4K",
    "footerLogo": "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgIHhtbG5zOmNjPSJodHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9ucyMiCiAgIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB3aWR0aD0iMzAwbW0iCiAgIGhlaWdodD0iMzAwbW0iCiAgIHZpZXdCb3g9IjAgMCAzMDAgMzAwIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmczNjg2IgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkyLjEgcjE1MzcxIgogICBzb2RpcG9kaTpkb2NuYW1lPSJhdmF0YXIuc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMzY4MCIgLz4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgaWQ9ImJhc2UiCiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEuMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6em9vbT0iMS4wMjk4NjExIgogICAgIGlua3NjYXBlOmN4PSI0NzAuMTYyNTEiCiAgICAgaW5rc2NhcGU6Y3k9IjUwMS41OTY2MiIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0ibW0iCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjI4ODAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTcwNiIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTExIgogICAgIGlua3NjYXBlOndpbmRvdy15PSItMTEiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIgLz4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGEzNjgzIj4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZSAvPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8ZwogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMiIKICAgICBpbmtzY2FwZTpsYWJlbD0iTGF5ZXIgMiIgLz4KICA8ZwogICAgIGlua3NjYXBlOmxhYmVsPSJMYXllciAxIgogICAgIGlua3NjYXBlOmdyb3VwbW9kZT0ibGF5ZXIiCiAgICAgaWQ9ImxheWVyMSIKICAgICB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDMpIj4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO3N0cm9rZS13aWR0aDowLjI2NDI5Mzc5IgogICAgICAgaWQ9InJlY3QyNCIKICAgICAgIHdpZHRoPSIzMDAiCiAgICAgICBoZWlnaHQ9IjMwMCIKICAgICAgIHg9IjEuMTEwMjIzZS0wMTUiCiAgICAgICB5PSItMyIgLz4KICAgIDxyZWN0CiAgICAgICBzdHlsZT0iZmlsbDojMDAwMDAwO3N0cm9rZS13aWR0aDowLjI2NDU4MzMyIgogICAgICAgaWQ9InJlY3QzNzc3IgogICAgICAgd2lkdGg9IjI2NC41ODMzNyIKICAgICAgIGhlaWdodD0iMjY0LjU4MzM3IgogICAgICAgeD0iMTcuNzA4MzEzIgogICAgICAgeT0iMTQuNzA4MzEzIiAvPgogICAgPHJlY3QKICAgICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7c3Ryb2tlLXdpZHRoOjAuNDAzMTkxMTgiCiAgICAgICBpZD0icmVjdDM3MzYiCiAgICAgICB3aWR0aD0iNjYuODI5ODExIgogICAgICAgaGVpZ2h0PSI2OS4xMjI1NDMiCiAgICAgICB4PSI0OC4wNjQxMzciCiAgICAgICB5PSIxMTIuMDc1MTkiIC8+CiAgICA8cmVjdAogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MC41NzA1NDk3MyIKICAgICAgIGlkPSJyZWN0MzczNi0zIgogICAgICAgd2lkdGg9IjEzOC4wMDM3OCIKICAgICAgIGhlaWdodD0iNjcuMDI5MTkiCiAgICAgICB4PSIxMTUuMDk2NDgiCiAgICAgICB5PSI0NC45Njk2NjYiIC8+CiAgICA8cmVjdAogICAgICAgc3R5bGU9ImZpbGw6I2ZmZmZmZjtzdHJva2Utd2lkdGg6MC40MDk0NTcxNSIKICAgICAgIGlkPSJyZWN0MzczNi0zLTMiCiAgICAgICB3aWR0aD0iNjguOTIzMTcyIgogICAgICAgaGVpZ2h0PSI2OS4xMjI1NDMiCiAgICAgICB4PSIxODQuMjc2NzYiCiAgICAgICB5PSIxODEuMDg3MzkiIC8+CiAgPC9nPgo8L3N2Zz4K",
    "organization": "CU Boulder ATLAS",
    "organizationUrl": "http://www.colorado.edu/atlas/",
    "organizationLogo": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFMAAABRCAYAAACuepoLAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsRAAALEQF/ZF+RAAAAGXRFWHRTb2Z0d2FyZQBwYWludC5uZXQgNC4wLjE3M26fYwAABDlJREFUeF7tnD9oU1EUhzsI3QRF6OSkFBGHQqFuUtQO3arQ2SDFQRFEqi4OxTq6SBGnIhZchA4WRCe1iA4OpcVBhGKDqIhQCgoVUYjn98gJt8l56X0v9753bnJ/8C3N/XPOlyb0vpemzzarz28OETNKmaiXqT9ULERuPb5/oTZ/55w6qDZQqZerNyzy9vWJ2p7+fpWcGR/WLzQEkYxqoWkiz05O1m7Nzqrg6vT0jtpUCk0TeX5qqqYtDxcWdtSoSuhuIje/rHCxpfP5/WJSk0qhtHkwIhmVQmnT4EQyqoTSZsGKZFQIpU2CF8mULpQ26AqRjIXQoXrr7oMNzE1DFsmkCa0fPUfrrbsPNufNhkdGkiJCFsl8/fA06eXU2Fg5MrExsv5uvqW4Zj6+uZeMKwPsLdVkgnFIEDJ/bX5KxpYR7C3VZBKczNW1tWROkeB9sCtlvlpebswtClzgiDIdEWU6JMp0iAOZV4hRH/SiTG/0lEyf4IkKUuaf7a3a9/UXbcEpDgleJo6lWKtTpLUhM0ukdQ4MDLTslYdDg4ONNb3JxM9dRFrbBdxnp8ETy2t6lbn981uyTh74JSqt7QLuExdDpP1tQAqTiceleTbgPQ+R1nZBlj7TQKJMIsp0SJTpkCjTIVGmQ6JMh0SZDglO5r+/v5MxzeA2rLSeiSaZP6pvxT6QQmTi3js2agaBKGk9k3YysTb2tQXXCZrXyNpntVoV+8E6vKY3mWkgncpEE2m/9SY4ziJmw4yPPoOVib2leSboAYkyFcs8Pny4drFysoVnC5ejTGmuSXOfEEc/3yBa/h8pyhTmmqTIfFm/H7kzmOBiExuQKFMgyhSCCS42sQGJMgWwSZ5kkZmWrpOJYyGazorN2hgjzWVsjqRqZG6sPGpZNDTQA1KaTNxPxmcucVyz+XSuVlA7ekAv6In7Y7zKPHrkYGNw6EJ3Ewl8yqy8XrzWFUJtRAJvMhF6sK1Qmzf8srEVCbzKRGhAqlBEs9AsIoF3mQgNCk5oVpGgEJkIDQxGaB6RoDCZCA1uKxT3RaQ/pm2waQBjpLnN5BEJCpWJ0ARR6JOlpWTxPCCQYBYrgTGItIYJaskqEhQuE6FJLUI7AckiU1rDBaXIRGiiM6FIT8tEaHIi9PSJY8k9kCzs27+3UQjS8zIRWqCCRTKSCOVCkCgzZ1BMlOkoKCbKdBQUE2U6CoqJMh0FxXQiE034gE9yPSET53804Ruc7aX9TTAuaJmaUCsTLy9cnLD5jdAAXiHI3bk5HTJxauJC+MpTCEJZZPMXTd24NI7HS5H5IO1SnmahaSJL/RpJhDYOSqhakRwqIAih6kVyqBDVQoMRyaGCVAoNTiSHCmsrFJ8RwsmkKPjbDIMTyWkntIykiNxSL5IjCdWAIdLfN8D6CBU8o0losCI5VLjTO6B5CV4kB0IJNFMmHYrs6/sP2OdwyRkqmasAAAAASUVORK5CYII=",
    "organizationWideLogo": "data:image/png;base64,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",
    "hideCookieNotice": true,
    "docMenu": [
      {
        "name": "About",
        "path": "/arcadia/docs/about.html"
      },
      {
        "name": "Preparing markers",
        "path": "/arcadia/docs/markers.html"
      },
      {
        "name": "Getting started",
        "path": "/arcadia/docs/program.html"
      },
      {
        "name": "Examples",
        "path": "/arcadia/docs/examples.html"
      }
    ],
    "coloredToolbox": false,
    "monacoToolbox": true,
    "invertedToolbox": true,
    "invertedMonaco": true,
    "invertedMenu": true,
    "simAnimationEnter": "scale in",
    "simAnimationExit": "scale out",
    "extendEditor": true,
    "disableBlockIcons": true,
    "blockColors": {
      "loops": "#2dc660",
      "logic": "#30cbd1",
      "math": "#d933ff",
      "variables": "#ff356e",
      "text": "#ffd018",
      "advanced": "#111111",
      "functions": "#3399ff",
      "arrays": "#b62fd1"
    },
    "galleries": {
      "Examples": "examples"
    },
    "TOC": [
      {
        "name": "Examples",
        "subitems": [
          {
            "name": "Blinky",
            "subitems": [],
            "path": "/examples/blinky",
            "prevName": "Examples",
            "prevPath": "/examples",
            "nextName": "Cheers",
            "nextPath": "/examples/cheers"
          },
          {
            "name": "Cheers",
            "subitems": [],
            "path": "/examples/cheers",
            "prevName": "Blinky",
            "prevPath": "/examples/blinky",
            "nextName": "Piano",
            "nextPath": "/examples/piano"
          },
          {
            "name": "Piano",
            "subitems": [],
            "path": "/examples/piano",
            "prevName": "Cheers",
            "prevPath": "/examples/cheers",
            "nextName": "Drums",
            "nextPath": "/examples/drums"
          },
          {
            "name": "Drums",
            "subitems": [],
            "path": "/examples/drums",
            "prevName": "Piano",
            "prevPath": "/examples/piano",
            "nextName": "DJ",
            "nextPath": "/examples/dj"
          },
          {
            "name": "DJ",
            "subitems": [],
            "path": "/examples/dj",
            "prevName": "Drums",
            "prevPath": "/examples/drums",
            "nextName": "Dinner Spinner",
            "nextPath": "/examples/dinner_spinner"
          },
          {
            "name": "Dinner Spinner",
            "subitems": [],
            "path": "/examples/dinner_spinner",
            "prevName": "DJ",
            "prevPath": "/examples/dj",
            "nextName": "Color wheel",
            "nextPath": "/examples/color_wheel"
          },
          {
            "name": "Color wheel",
            "subitems": [],
            "path": "/examples/color_wheel",
            "prevName": "Dinner Spinner",
            "prevPath": "/examples/dinner_spinner",
            "nextName": "Timer",
            "nextPath": "/examples/timer"
          },
          {
            "name": "Timer",
            "subitems": [],
            "path": "/examples/timer",
            "prevName": "Color wheel",
            "prevPath": "/examples/color_wheel",
            "nextName": "Theremin",
            "nextPath": "/examples/theremin"
          },
          {
            "name": "Theremin",
            "subitems": [],
            "path": "/examples/theremin",
            "prevName": "Timer",
            "prevPath": "/examples/timer",
            "nextName": "Rainbow paintbrush",
            "nextPath": "/examples/rainbow_paintbrush"
          },
          {
            "name": "Rainbow paintbrush",
            "subitems": [],
            "path": "/examples/rainbow_paintbrush",
            "prevName": "Theremin",
            "prevPath": "/examples/theremin",
            "nextName": "Blocks",
            "nextPath": "/blocks"
          }
        ],
        "path": "/examples",
        "nextName": "Blinky",
        "nextPath": "/examples/blinky"
      },
      {
        "name": "Blocks",
        "subitems": [
          {
            "name": "On Start",
            "subitems": [],
            "path": "/blocks/on-start",
            "prevName": "Blocks",
            "prevPath": "/blocks",
            "nextName": "Loops",
            "nextPath": "/blocks/loops"
          },
          {
            "name": "Loops",
            "subitems": [
              {
                "name": "repeat",
                "subitems": [],
                "path": "/blocks/loops/repeat",
                "prevName": "Loops",
                "prevPath": "/blocks/loops",
                "nextName": "for",
                "nextPath": "/blocks/loops/for"
              },
              {
                "name": "for",
                "subitems": [],
                "path": "/blocks/loops/for",
                "prevName": "repeat",
                "prevPath": "/blocks/loops/repeat",
                "nextName": "while",
                "nextPath": "/blocks/loops/while"
              },
              {
                "name": "while",
                "subitems": [],
                "path": "/blocks/loops/while",
                "prevName": "for",
                "prevPath": "/blocks/loops/for",
                "nextName": "Logic",
                "nextPath": "/blocks/logic"
              }
            ],
            "path": "/blocks/loops",
            "prevName": "On Start",
            "prevPath": "/blocks/on-start",
            "nextName": "repeat",
            "nextPath": "/blocks/loops/repeat"
          },
          {
            "name": "Logic",
            "subitems": [
              {
                "name": "if",
                "subitems": [],
                "path": "/blocks/logic/if",
                "prevName": "Logic",
                "prevPath": "/blocks/logic",
                "nextName": "Boolean",
                "nextPath": "/blocks/logic/boolean"
              },
              {
                "name": "Boolean",
                "subitems": [],
                "path": "/blocks/logic/boolean",
                "prevName": "if",
                "prevPath": "/blocks/logic/if",
                "nextName": "Variables",
                "nextPath": "/blocks/variables"
              }
            ],
            "path": "/blocks/logic",
            "prevName": "while",
            "prevPath": "/blocks/loops/while",
            "nextName": "if",
            "nextPath": "/blocks/logic/if"
          },
          {
            "name": "Variables",
            "subitems": [
              {
                "name": "assign",
                "subitems": [],
                "path": "/blocks/variables/assign",
                "prevName": "Variables",
                "prevPath": "/blocks/variables",
                "nextName": "change var",
                "nextPath": "/blocks/variables/change"
              },
              {
                "name": "change var",
                "subitems": [],
                "path": "/blocks/variables/change",
                "prevName": "assign",
                "prevPath": "/blocks/variables/assign",
                "nextName": "var",
                "nextPath": "/blocks/variables/var"
              },
              {
                "name": "var",
                "subitems": [],
                "path": "/blocks/variables/var",
                "prevName": "change var",
                "prevPath": "/blocks/variables/change",
                "nextName": "Math",
                "nextPath": "/blocks/math"
              }
            ],
            "path": "/blocks/variables",
            "prevName": "Boolean",
            "prevPath": "/blocks/logic/boolean",
            "nextName": "assign",
            "nextPath": "/blocks/variables/assign"
          },
          {
            "name": "Math",
            "subitems": [],
            "path": "/blocks/math",
            "prevName": "var",
            "prevPath": "/blocks/variables/var",
            "nextName": "JavaScript blocks",
            "nextPath": "/blocks/javascript-blocks"
          },
          {
            "name": "JavaScript blocks",
            "subitems": [],
            "path": "/blocks/javascript-blocks",
            "prevName": "Math",
            "prevPath": "/blocks/math",
            "nextName": "Custom blocks",
            "nextPath": "/blocks/custom"
          },
          {
            "name": "Custom blocks",
            "subitems": [],
            "path": "/blocks/custom",
            "prevName": "JavaScript blocks",
            "prevPath": "/blocks/javascript-blocks",
            "nextName": "JavaScript",
            "nextPath": "/javascript"
          }
        ],
        "path": "/blocks",
        "prevName": "Rainbow paintbrush",
        "prevPath": "/examples/rainbow_paintbrush",
        "nextName": "On Start",
        "nextPath": "/blocks/on-start"
      },
      {
        "name": "JavaScript",
        "subitems": [
          {
            "name": "Calling",
            "subitems": [],
            "path": "/javascript/call",
            "prevName": "JavaScript",
            "prevPath": "/javascript",
            "nextName": "Sequencing",
            "nextPath": "/javascript/sequence"
          },
          {
            "name": "Sequencing",
            "subitems": [],
            "path": "/javascript/sequence",
            "prevName": "Calling",
            "prevPath": "/javascript/call",
            "nextName": "Variables",
            "nextPath": "/javascript/variables"
          },
          {
            "name": "Variables",
            "subitems": [],
            "path": "/javascript/variables",
            "prevName": "Sequencing",
            "prevPath": "/javascript/sequence",
            "nextName": "Operators",
            "nextPath": "/javascript/operators"
          },
          {
            "name": "Operators",
            "subitems": [],
            "path": "/javascript/operators",
            "prevName": "Variables",
            "prevPath": "/javascript/variables",
            "nextName": "Statements",
            "nextPath": "/javascript/statements"
          },
          {
            "name": "Statements",
            "subitems": [],
            "path": "/javascript/statements",
            "prevName": "Operators",
            "prevPath": "/javascript/operators",
            "nextName": "Functions",
            "nextPath": "/javascript/functions"
          },
          {
            "name": "Functions",
            "subitems": [],
            "path": "/javascript/functions",
            "prevName": "Statements",
            "prevPath": "/javascript/statements",
            "nextName": "Types",
            "nextPath": "/javascript/types"
          },
          {
            "name": "Types",
            "subitems": [],
            "path": "/javascript/types",
            "prevName": "Functions",
            "prevPath": "/javascript/functions",
            "nextName": "Classes",
            "nextPath": "/javascript/classes"
          },
          {
            "name": "Classes",
            "subitems": [],
            "path": "/javascript/classes",
            "prevName": "Types",
            "prevPath": "/javascript/types",
            "nextName": "Interfaces",
            "nextPath": "/javascript/interfaces"
          },
          {
            "name": "Interfaces",
            "subitems": [],
            "path": "/javascript/interfaces",
            "prevName": "Classes",
            "prevPath": "/javascript/classes",
            "nextName": "Generics",
            "nextPath": "/javascript/generics"
          },
          {
            "name": "Generics",
            "subitems": [],
            "path": "/javascript/generics",
            "prevName": "Interfaces",
            "prevPath": "/javascript/interfaces",
            "nextName": "Types",
            "nextPath": "/types"
          }
        ],
        "path": "/javascript",
        "prevName": "Custom blocks",
        "prevPath": "/blocks/custom",
        "nextName": "Calling",
        "nextPath": "/javascript/call"
      },
      {
        "name": "Types",
        "subitems": [
          {
            "name": "Number",
            "subitems": [],
            "path": "/types/number",
            "prevName": "Types",
            "prevPath": "/types",
            "nextName": "String",
            "nextPath": "/types/string"
          },
          {
            "name": "String",
            "subitems": [],
            "path": "/types/string",
            "prevName": "Number",
            "prevPath": "/types/number",
            "nextName": "Boolean",
            "nextPath": "/types/boolean"
          },
          {
            "name": "Boolean",
            "subitems": [],
            "path": "/types/boolean",
            "prevName": "String",
            "prevPath": "/types/string",
            "nextName": "Array",
            "nextPath": "/types/array"
          },
          {
            "name": "Array",
            "subitems": [],
            "path": "/types/array",
            "prevName": "Boolean",
            "prevPath": "/types/boolean",
            "nextName": "Function",
            "nextPath": "/types/function"
          },
          {
            "name": "Function",
            "subitems": [],
            "path": "/types/function",
            "prevName": "Array",
            "prevPath": "/types/array",
            "nextName": "Support",
            "nextPath": "/support"
          }
        ],
        "path": "/types",
        "prevName": "Generics",
        "prevPath": "/javascript/generics",
        "nextName": "Number",
        "nextPath": "/types/number"
      },
      {
        "name": "",
        "subitems": [
          {
            "name": "Support",
            "subitems": [],
            "path": "/support",
            "prevName": "Function",
            "prevPath": "/types/function",
            "nextName": "FAQ",
            "nextPath": "/faq"
          },
          {
            "name": "FAQ",
            "subitems": [],
            "path": "/faq",
            "prevName": "Support",
            "prevPath": "/support",
            "nextName": "Translate",
            "nextPath": "/translate"
          },
          {
            "name": "Translate",
            "subitems": [],
            "path": "/translate",
            "prevName": "FAQ",
            "prevPath": "/faq",
            "nextName": "Sharing projects",
            "nextPath": "/share"
          },
          {
            "name": "Sharing projects",
            "subitems": [],
            "path": "/share",
            "prevName": "Translate",
            "prevPath": "/translate",
            "nextName": "Offline support",
            "nextPath": "/offline"
          },
          {
            "name": "Offline support",
            "subitems": [],
            "path": "/offline",
            "prevName": "Sharing projects",
            "prevPath": "/share",
            "nextName": "Streaming",
            "nextPath": "/streaming"
          },
          {
            "name": "Streaming",
            "subitems": [],
            "path": "/streaming",
            "prevName": "Offline support",
            "prevPath": "/offline",
            "nextName": "Documentation",
            "nextPath": "/docs"
          }
        ],
        "prevName": "Function",
        "prevPath": "/types/function"
      },
      {
        "name": "Documentation",
        "subitems": [
          {
            "name": "About",
            "subitems": [],
            "path": "/about",
            "prevName": "Documentation",
            "prevPath": "/docs",
            "nextName": "Preparing your markers",
            "nextPath": "/markers"
          },
          {
            "name": "Preparing your markers",
            "subitems": [],
            "path": "/markers",
            "prevName": "About",
            "prevPath": "/about",
            "nextName": "Writing your first program",
            "nextPath": "/program"
          },
          {
            "name": "Writing your first program",
            "subitems": [],
            "path": "/program",
            "prevName": "Preparing your markers",
            "prevPath": "/markers"
          }
        ],
        "path": "/docs",
        "prevName": "Streaming",
        "prevPath": "/streaming",
        "nextName": "About",
        "nextPath": "/about"
      }
    ],
    "embedUrl": "https://laboratoryforplayfulcomputation.github.io/arcadia/",
    "id": "arcadia",
    "title": "Marker-based Augmented Reality Code Editor",
    "name": "Arcadia",
    "logoCDN": "@cdnUrl@/blob/fdb2da99c22d44dc6ae9f9b24c267c9e9f51bec5/static/logo.svg",
    "docsLogoCDN": "@cdnUrl@/blob/fdb2da99c22d44dc6ae9f9b24c267c9e9f51bec5/static/logo.svg",
    "portraitLogoCDN": "@cdnUrl@/blob/fdb2da99c22d44dc6ae9f9b24c267c9e9f51bec5/static/logo.svg",
    "footerLogoCDN": "@cdnUrl@/blob/fdb2da99c22d44dc6ae9f9b24c267c9e9f51bec5/static/logo.svg",
    "organizationLogoCDN": "@cdnUrl@/blob/edfb3030f2e395a8772bc07928a2fea983f2eecd/static/cuicon.png",
    "organizationWideLogoCDN": "@cdnUrl@/blob/c5db58f98d3cdcdbacfd420d0eba29871a11d0e8/static/cuwide.png",
    "htmlDocIncludes": {},
    "locales": {}
  },
  "blocksprj": {
    "id": "blocksprj",
    "config": {
      "name": "{0}",
      "dependencies": {
        "core": "*"
      },
      "description": "",
      "files": [
        "main.blocks",
        "main.ts",
        "README.md"
      ]
    },
    "files": {
      "README.md": " ",
      "main.blocks": "<xml xmlns=\"http://www.w3.org/1999/xhtml\">\n</xml>",
      "main.ts": " "
    }
  },
  "tsprj": {
    "id": "tsprj",
    "config": {
      "name": "{0}",
      "dependencies": {
        "core": "*"
      },
      "description": "",
      "files": [
        "main.ts",
        "README.md"
      ]
    },
    "files": {
      "README.md": " ",
      "main.ts": " "
    }
  },
  "bundledpkgs": {
    "core": {
      "README.md": "# basic\n\nAdd your docs here...",
      "enums.d.ts": "declare const enum Direction {\n    //% block=left\n    Left,\n    //% block=right\n    Right\n}\n\ndeclare const enum Axes {\n    //% block='x' blockIdentity=axes.named\n    x,\n    //% block='y' blockIdentity=axes.named\n    y,\n    //% block='z' blockIdentity=axes.named\n    z\n}\n\n/**\n * An augmented reality marker\n */\ndeclare const enum MarkerCode {\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=0\n    Marker0 = 0,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=1\n    Marker1 = 1,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=2\n    Marker2 = 2,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=3\n    Marker3 = 3,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=4\n    Marker4 = 4,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=5\n    Marker5 = 5,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=6\n    Marker6 = 6,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=7\n    Marker7 = 7,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=8\n    Marker8 = 8,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=9\n    Marker9 = 9,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=10\n    Marker10 = 10,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=11\n    Marker11 = 11,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=12\n    Marker12 = 12,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=13\n    Marker13 = 13,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=14\n    Marker14 = 14,\n    //% blockImage=1\n    //% blockIdentity=markers.marker enumval=15\n    Marker15 = 15\n}\n\ndeclare const enum MarkerEvent {\n    //% block=\"hidden\"\n    //% enumval=0x01\n    Hidden = 0x01,     \n    //% block=\"visible\"\n    //% enumval=0x02\n    Visible = 0x02,  \n    //% block=\"moved\"\n    //% enumval=0x03\n    Moved = 0x03,\n    //% block=\"moved left\"\n    //% enumval=0x04\n    MovedLeft = 0x04,\n    //% block=\"moved right\"\n    //% enumval=0x05\n    MovedRight = 0x05,    \n    //% block=\"moved up\"\n    //% enumval=0x06\n    MovedUp = 0x06,\n    //% block=\"moved down\"\n    //% enumval=0x07\n    MovedDown = 0x07,    \n    //% block=\"moved forward\"\n    //% enumval=0x11\n    MovedForward = 0x11,\n    //% block=\"moved backward\"\n    //% enumval=0x12\n    MovedBackward = 0x12          \n}\n\ndeclare const enum MarkerLoopEvent {\n    //% block=\"hidden\"\n    //% enumval=0x13    \n    WhileHidden = 0x13,\n    //% block=\"visible\"\n    //% enumval=0x14    \n    WhileVisible = 0x14\n}\n\ndeclare const enum MultiMarkerEvent {\n    //% block=\"close to\"\n    //% enumval=0x15\n    Close = 0x15,\n    //% block=\"far from\"\n    //% enumval=0x16\n    Far = 0x16,\n    //% block=\"touching\"\n    //% enumval=0x17\n    Touching = 0x17\n}\n\n/**\n * Well known colors for a NeoPixel strip\n */\ndeclare const enum Colors {\n    //% block=red blockIdentity=colors.named\n    //% enumval=0xFF0000\n    Red = 0xFF0000,\n    //% block=orange blockIdentity=colors.named\n    //% enumval=0xFFA500\n    Orange = 0xFFA500,\n    //% block=yellow blockIdentity=colors.named\n    //% enumval=0xFFFF00\n    Yellow = 0xFFFF00,\n    //% block=green blockIdentity=colors.named\n    //% enumval=0x00FF00\n    Green = 0x00FF00,\n    //% block=blue blockIdentity=colors.named\n    //% enumval=0x0000FF\n    Blue = 0x0000FF,\n    //% block=indigo blockIdentity=colors.named\n    //% enumval=0x4b0082\n    Indigo = 0x4b0082,\n    //% block=violet blockIdentity=colors.named\n    //% enumval=0x8a2be2\n    Violet = 0x8a2be2,\n    //% block=purple blockIdentity=colors.named\n    //% enumval=0xFF00FF\n    Purple = 0xFF00FF,\n    //% block=pink blockIdentity=colors.named\n    //% enumval=0xFF54A6\n    Pink = 0xFF54A6,\n    //% block=white blockIdentity=colors.named\n    //% enumval=0xFFFFFF\n    White = 0xFFFFFF,\n    //% block=black  blockIdentity=colors.named\n    //% enumval=0x000000\n    Black = 0x000000\n}\n\n/**\n * 3D Shape Primitives supported by THREE.js\n */\ndeclare const enum Shape {\n    //% block='box'\n    //% blockImage=1\n    Box,\n    //% block='sphere'\n    //% blockImage=1\n    Sphere,    \n    //% block='cone'\n    //% blockImage=1\n    Cone, \n    //% block='cylinder'\n    //% blockImage=1\n    Cylinder,    \n    //% block='tetrahedron'\n    //% blockImage=1\n    Tetrahedron,\n    //% block='icosahedron'\n    //% blockImage=1    \n    Icosahedron,\n}\n\ndeclare const enum Filter {\n    //% block='grayscale'\n    Grayscale = 1,\n    //% block='sepia'\n    Sepia = 2,\n    //% block='invert'\n    Invert = 3,\n    //% block='saturate'\n    Saturate = 4,\n    //% block='hue-rotate'\n    HueRotate = 5,\n    //% block='blur'\n    Blur = 6,\n    //% block='high contrast'\n    Contrast = 7,\n    //% block='green'\n    Green = 8     \n}\n\ndeclare const enum ModelType {\n    OBJ,\n    STL,\n    MTL,\n    DAE\n}\n\ndeclare const enum Toggle {\n    on,\n    off\n}",
      "ns.ts": "/**\n * Augment Reality markers\n */\n//% weight=89 icon=\"\\uf21d\" color=#9239ff\nnamespace markers {\n\n    /**\n     * An augmented reality marker\n     * @param marker The value of the marker\n     */\n    //% blockId=marker_block block=\"%marker\"\n    //% weight=100\n    //% marker.fieldEditor=\"imagedropdown\"\n    //% marker.fieldOptions.width=\"250\" marker.fieldOptions.columns=\"4\"\n    //% marker.fieldOptions.itemColour=\"black\" marker.fieldOptions.tooltips=\"true\"\n    //% marker.fieldOptions.decompileLiterals=true marker.defl=0\n    //% shim=TD_ID useEnumVal=1\n    export function marker(marker: MarkerCode): number { \n        return marker;\n    } \n}\n\n/**\n * Colors\n */\n//% weight=87 icon=\"\\uf1fc\" color=#4c38ff\nnamespace colors {\n}\n\n/**\n * Design\n */\n//% weight=91 icon=\"\\uf005\" color=#16ccb0\nnamespace design {\n}\n\n/**\n * Motion\n */\n//% weight=92 icon=\"\\uf110\" color=#FF5722\nnamespace interaction {\n}\n\n/**\n * Paint\n */\n//% icon=\"\\uf1fc\" color=#e00d0d\nnamespace paint {\n}\n\n\n/**\n * Models\n */\n//% weight=88 icon=\"\\uf1fc\" color=#4d03a3\nnamespace models {\n}\n\n/**\n * Messaging\n */\n//% color=#6657b2 icon=\"\\uf003\" weight=88\nnamespace messaging {\n    \n}",
      "pxt-core.d.ts": "/// <reference no-default-lib=\"true\"/>\n\ninterface Array<T> {\n    /**\n      * Gets or sets the length of the array. This is a number one higher than the highest element defined in an array.\n      */\n    //% shim=Array_::length weight=84\n    //% blockId=\"lists_length\" block=\"length of %VALUE\" blockBuiltin=true blockNamespace=\"arrays\"\n    length: number;\n\n    /**\n      * Appends new elements to an array.\n      * @param items New elements of the Array.\n      */\n    //% help=arrays/push\n    //% shim=Array_::push weight=49\n    //% blockId=\"array_push\" block=\"%list| add value %value| to end\" blockNamespace=\"arrays\"\n    push(item: T): void;\n\n    /**\n      * Removes the last element from an array and returns it.\n      */\n    //% help=arrays/pop\n    //% shim=Array_::pop weight=48\n    //% blockId=\"array_pop\" block=\"get and remove last value from %list\" blockNamespace=\"arrays\"\n    pop(): T;\n\n    /**\n      * Reverses the elements in an Array. The first array element becomes the last, and the last array element becomes the first.\n      */\n    //% help=arrays/reverse\n    //% helper=arrayReverse weight=10 advanced=true\n    //% blockId=\"array_reverse\" block=\"reverse %list\" blockNamespace=\"arrays\"\n    reverse(): void;\n\n    /**\n      * Removes the first element from an array and returns that element. This method changes the length of the array.\n      */\n    //% help=arrays/shift\n    //% helper=arrayShift weight=70 advanced=true\n    //% blockId=\"array_shift\" block=\"get and remove first value from %list\" blockNamespace=\"arrays\"\n    shift(): T;\n\n    /**\n      * Adds one element to the beginning of an array and returns the new length of the array.\n      * @param element to insert at the start of the Array.\n      */\n    //% help=arrays/unshift\n    //% helper=arrayUnshift weight=69 advanced=true\n    //% blockId=\"array_unshift\" block=\"%list| insert %value| at beginning\" blockNamespace=\"arrays\"\n    //unshift(...values:T[]): number; //rest is not supported in our compiler yet.\n    unshift(value: T): number;\n\n    /**\n      * Returns a section of an array.\n      * @param start The beginning of the specified portion of the array. eg: 0\n      * @param end The end of the specified portion of the array. eg: 0\n      */\n    //% help=arrays/slice\n    //% helper=arraySlice weight=41 advanced=true blockNamespace=\"arrays\"\n    slice(start: number, end: number): T[];\n\n    /**\n      * Removes elements from an array.\n      * @param start The zero-based location in the array from which to start removing elements. eg: 0\n      * @param deleteCount The number of elements to remove. eg: 0\n      */\n    //% helper=arraySplice weight=40\n    splice(start: number, deleteCount: number): void;\n\n    /**\n      * Sorts the elements of an array in place and returns the array. The sort is not necessarily stable.\n      * @param specifies a function that defines the sort order. If omitted, the array is sorted according to the prmitive type\n      */\n    //% helper=arraySort weight=40\n    sort(callbackfn?: (value1: T, value2: T) => number): T[];\n\n    /**\n      * Calls a defined callback function on each element of an array, and returns an array that contains the results.\n      * @param callbackfn A function that accepts up to two arguments. The map method calls the callbackfn function one time for each element in the array.\n      */\n    //% helper=arrayMap weight=40\n    map<U>(callbackfn: (value: T, index: number) => U): U[];\n\n    /**\n      * Returns the elements of an array that meet the condition specified in a callback function.\n      * @param callbackfn A function that accepts up to two arguments. The filter method calls the callbackfn function one time for each element in the array.\n      */\n    //% helper=arrayFilter weight=40\n    filter(callbackfn: (value: T, index: number) => boolean): T[];\n\n    /**\n      * Calls the specified callback function for all the elements in an array. The return value of the callback function is the accumulated result, and is provided as an argument in the next call to the callback function.\n      * @param callbackfn A function that accepts up to three arguments. The reduce method calls the callbackfn function one time for each element in the array.\n      * @param initialValue Initial value to start the accumulation. The first call to the callbackfn function provides this value as an argument instead of an array value.\n      */\n    //% helper=arrayReduce weight=40\n    reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U;\n\n\n    /** Removes the first occurence of an object. Returns true if removed. */\n    //% shim=Array_::removeElement weight=48\n    removeElement(element: T): boolean;\n\n    /** Removes the object at position index. */\n    //% help=arrays/removeat\n    //% shim=Array_::removeAt weight=49 advanced=true\n    //% blockId=\"array_removeat\" block=\"%list| remove value at %index\" blockNamespace=\"arrays\"\n    removeAt(index: number): T;\n\n    /**\n     * Insert the value at a particular index, increases length by 1\n     * @param index the zero-based position in the list to insert the value, eg: 0\n     * @param the value to insert, eg: 0\n     */\n    //% help=arrays/insertat\n    //% shim=Array_::insertAt weight=84 advanced=true\n    //% blockId=\"array_insertAt\" block=\"%list| insert at %index| value %value\" blockNamespace=\"arrays\"\n    insertAt(index: number, value: T): void;\n\n    /**\n      * Returns the index of the first occurrence of a value in an array.\n      * @param item The value to locate in the array.\n      * @param fromIndex The array index at which to begin the search. If fromIndex is omitted, the search starts at index 0.\n      */\n    //% help=arrays/indexof\n    //% shim=Array_::indexOf weight=50 advanced=true\n    //% blockId=\"array_indexof\" block=\"%list| find index of %value\" blockNamespace=\"arrays\"\n    indexOf(item: T, fromIndex?: number): number;\n\n    /**\n     * Gets the value at a particular index\n     * @param index the zero-based position in the list of the item, eg: 0\n     */\n    //% help=arrays/get\n    //% shim=Array_::getAt weight=85\n    get(index: number): T;\n\n    /**\n     * Stores the value at a particular index\n     * @param index the zero-based position in the list to store the value, eg: 0\n     * @param the value to insert, eg: 0\n     */\n    //% help=arrays/set\n    //% shim=Array_::setAt weight=84\n    set(index: number, value: T): void;\n\n    [n: number]: T;\n}\n\ndeclare interface String {\n    // This block is currently disabled in favor of the built-in Blockly \"Create text with\" block, which compiles to \"\" + \"\"\n    // Add % sign back to the block annotation to re-enable\n    /**\n     * Returns a string that contains the concatenation of two or more strings.\n     * @param other The string to append to the end of the string.\n     */\n    //% shim=String_::concat weight=49\n    //% blockId=\"string_concat\" blockNamespace=\"text\"\n    // block=\"join %list=text|%other\"\n    concat(other: string): string;\n\n    /**\n     * Returns the character at the specified index.\n     * @param index The zero-based index of the desired character.\n     */\n    //% shim=String_::charAt weight=48\n    //% help=text/char-at\n    //% blockId=\"string_get\" block=\"char from %this=text|at %pos\" blockNamespace=\"text\"\n    charAt(index: number): string;\n\n    /** Returns the length of a String object. */\n    //% property shim=String_::length weight=47\n    //% blockId=\"text_length\" block=\"length of %VALUE\" blockBuiltin=true blockNamespace=\"text\"\n    length: number;\n\n    /**\n     * Returns the Unicode value of the character at the specified location.\n     * @param index The zero-based index of the desired character. If there is no character at the specified index, NaN is returned.\n     */\n    //% shim=String_::charCodeAt\n    charCodeAt(index: number): number;\n\n    /**\n     * Determines whether relative order of two strings (in ASCII encoding).\n     * @param that String to compare to target string\n     */\n    //% shim=String_::compare\n    //% help=text/compare\n    //% blockId=\"string_compare\" block=\"compare %this=text| to %that\" blockNamespace=\"text\"\n    compare(that: string): number;\n\n    /**\n     * Return substring of the current string.\n     * @param start first character index; can be negative from counting from the end, eg:0\n     * @param length number of characters to extract\n     */\n    //% shim=String_::substr length.defl=1000000\n    //% help=text/substr\n    //% blockId=\"string_substr\" block=\"substring of %this=text|from %start|of length %length\" blockNamespace=\"text\"\n    substr(start: number, length?: number): string;\n\n    // This block is currently disabled, as it does not compile in some targets\n    // Add % sign back to the block annotation to re-enable\n    /** Returns a value indicating if the string is empty */\n    //% shim=String_::isEmpty\n    //% blockId=\"string_isempty\" blockNamespace=\"text\"\n    // block=\"%this=text| is empty\"\n    isEmpty(): boolean;\n\n    [index: number]: string;\n}\n\n/**\n  * Convert a string to an integer.\n  * @param s A string to convert into a number.\n  */\n//% shim=String_::toNumber\n//% help=text/parse-int\n//% blockId=\"string_parseint\" block=\"parse to integer %text\" blockNamespace=\"text\"\ndeclare function parseInt(text: string): number;\n\ninterface Object { }\ninterface Function { }\ninterface IArguments { }\ninterface RegExp { }\n\ntype uint8 = number;\ntype uint16 = number;\ntype uint32 = number;\ntype int8 = number;\ntype int16 = number;\ntype int32 = number;\n\n\ndeclare interface Boolean {\n    /**\n     * Returns a string representation of an object.\n     */\n    //% shim=Boolean_::toString\n    toString(): string;\n}\n\n/**\n * Combine, split, and search text strings.\n*/\n//% blockNamespace=\"Text\"\ndeclare namespace String {\n\n    /**\n     * Make a string from the given ASCII character code.\n     */\n    //% help=math/string-from-char-code\n    //% shim=String_::fromCharCode\n    //% advanced=true\n    //% blockNamespace=\"Math\" blockId=\"stringFromCharCode\" block=\"text from char code %code\" weight=1\n    function fromCharCode(code: number): string;\n}\n\ndeclare interface Number {\n    /**\n     * Returns a string representation of a number.\n     */\n    //% shim=Number_::toString\n    toString(): string;\n}\n\n/**\n * Add, remove, and replace items in lists.\n*/\n//% blockNamespace=\"Arrays\"\ndeclare namespace Array {\n}\n\n/**\n * More complex operations with numbers.\n*/\ndeclare namespace Math {\n    /**\n     * Returns the value of a base expression taken to a specified power.\n     * @param x The base value of the expression.\n     * @param y The exponent value of the expression.\n     */\n    //% shim=Math_::pow\n    function pow(x: number, y: number): number;\n\n    /**\n     * Returns a pseudorandom number between 0 and 1.\n     */\n    //% shim=Math_::random\n    //% helpUrl=\"/reference/math/random\"\n    function random(): number;\n\n    /**\n     * Returns a pseudorandom number between min and max included. \n     * If both numbers are integral, the result is integral.\n     * @param min the lower inclusive bound, eg: 0\n     * @param max the upper inclusive bound, eg: 10\n     */\n    //% blockId=\"device_random\" block=\"pick random %min|to %limit\"\n    //% helpUrl=\"/reference/math/random-range\"\n    //% shim=Math_::randomRange\n    function randomRange(min: number, max: number): number;\n\n    /**\n     * Returns the natural logarithm (base e) of a number.\n     * @param x A number\n     */\n    //% shim=Math_::log\n    function log(x: number): number;\n\n    /**\n     * Returns returns ``e^x``.\n     * @param x A number\n     */\n    //% shim=Math_::exp\n    function exp(x: number): number;\n\n    /**\n     * Returns the sine of a number.\n     * @param x An angle in radians\n     */\n    //% shim=Math_::sin\n    function sin(x: number): number;\n\n    /**\n     * Returns the cosine of a number.\n     * @param x An angle in radians\n     */\n    //% shim=Math_::cos\n    function cos(x: number): number;\n\n    /**\n     * Returns the tangent of a number.\n     * @param x An angle in radians\n     */\n    //% shim=Math_::tan\n    function tan(x: number): number;\n\n    /**\n     * Returns the arcsine (in radians) of a number\n     * @param x A number\n     */\n    //% shim=Math_::asin\n    function asin(x: number): number;\n\n    /**\n     * Returns the arccosine (in radians) of a number\n     * @param x A number\n     */\n    //% shim=Math_::acos\n    function acos(x: number): number;\n\n    /**\n     * Returns the arctangent (in radians) of a number\n     * @param x A number\n     */\n    //% shim=Math_::atan\n    function atan(x: number): number;\n\n    /**\n     * Returns the arctangent of the quotient of its arguments.\n     * @param y A number\n     * @param x A number\n     */\n    //% shim=Math_::atan2\n    function atan2(y: number, x: number): number;\n\n    /**\n     * Returns the square root of a number.\n     * @param x A numeric expression.\n     */\n    //% shim=Math_::sqrt\n    function sqrt(x: number): number;\n\n    /**\n     * Returns the smallest number greater than or equal to its numeric argument.\n     * @param x A numeric expression.\n     */\n    //% shim=Math_::ceil\n    function ceil(x: number): number;\n\n    /**\n      * Returns the greatest number less than or equal to its numeric argument.\n      * @param x A numeric expression.\n      */\n    //% shim=Math_::floor\n    function floor(x: number): number;\n\n    /**\n      * Returns the number with the decimal part truncated.\n      * @param x A numeric expression.\n      */\n    //% shim=Math_::trunc\n    function trunc(x: number): number;\n\n    /**\n      * Returns a supplied numeric expression rounded to the nearest number.\n      * @param x The value to be rounded to the nearest number.\n      */\n    //% shim=Math_::round\n    function round(x: number): number;\n\n    /**\n     * Returns the value of integer signed 32 bit multiplication of two numbers.\n     * @param x The first number\n     * @param y The second number\n     */\n    //% shim=Math_::imul\n    function imul(x: number, y: number): number;\n\n    /**\n     * Returns the value of integer signed 32 bit division of two numbers.\n     * @param x The first number\n     * @param y The second number\n     */\n    //% shim=Math_::idiv\n    function idiv(x: number, y: number): number;\n}\n",
      "pxt-helpers.ts": "type Action = () => void;\n\nnamespace helpers {\n    export function arraySplice<T>(arr: T[], start: number, len: number) {\n        if (start < 0) {\n            return;\n        }\n        for (let i = 0; i < len; ++i) {\n            arr.removeAt(start)\n        }\n    }\n\n    export function arrayReverse<T>(arr: T[]): void {\n        let len = arr.length;\n        for (let i = 0; i < len / 2; i++) {\n            swap(arr, i, len - i - 1);\n        }\n    }\n\n    export function arrayShift<T>(arr: T[]): T {\n        return arr.removeAt(0);\n    }\n\n    /*TODO: Enable this multiple value unshift, after rest is enabled in our compiler.\n        export function arrayUnshift<T>(arr: T[], ...values: T[]) : number {\n            for(let i = values.length; i > 0; --i) {\n                arr.insertAt(0, values[i - 1]);\n            }\n            return arr.length;\n        }\n    */\n    export function arrayUnshift<T>(arr: T[], value: T): number {\n        arr.insertAt(0, value);\n        return arr.length;\n    }\n\n    function swap<T>(arr: T[], i: number, j: number): void {\n        let temp: T = arr[i];\n        arr[i] = arr[j];\n        arr[j] = temp;\n    }\n\n    function sortHelper<T>(arr: T[], callbackfn?: (value1: T, value2: T) => number): T[] {\n        if (arr.length <= 0 || !callbackfn) {\n            return arr;\n        }\n        let len = arr.length;\n        // simple selection sort.\n        for (let i = 0; i < len - 1; ++i) {\n            for (let j = i + 1; j < len; ++j) {\n                if (callbackfn(arr[i], arr[j]) > 0) {\n                    swap(arr, i, j);\n                }\n            }\n        }\n        return arr;\n    }\n\n    export function arraySort<T>(arr: T[], callbackfn?: (value1: T, value2: T) => number): T[] {\n        if (!callbackfn) {\n            //TODO: support native strings and number sorting\n            /* callbackfn = function (value1: string, value2: string) : number {\n                return value1.compare(value2);\n                }*/\n        }\n        return sortHelper(arr, callbackfn);\n    }\n\n    export function arrayMap<T, U>(arr: T[], callbackfn: (value: T, index: number) => U): U[] {\n        let res: U[] = []\n        let len = arr.length // caching this seems to match V8\n        for (let i = 0; i < len; ++i) {\n            res.push(callbackfn(arr[i], i))\n        }\n        return res\n    }\n\n    export function arrayFilter<T>(arr: T[], callbackfn: (value: T, index: number) => boolean): T[] {\n        let res: T[] = []\n        let len = arr.length\n        for (let i = 0; i < len; ++i) {\n            let v = arr[i] // need to cache\n            if (callbackfn(v, i)) res.push(v)\n        }\n        return res\n    }\n\n    export function arrayReduce<T, U>(arr: T[], callbackfn: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U {\n        let len = arr.length\n        for (let i = 0; i < len; ++i) {\n            initialValue = callbackfn(initialValue, arr[i], i)\n        }\n        return initialValue\n    }\n\n    export function arraySlice<T>(arr: T[], start: number, end: number): T[] {\n        const res: T[] = [];\n        const len = arr.length;\n\n        if (start < 0) {\n            start = Math.max(len + start, 0);\n        }\n\n        if (end < 0) {\n            end = len + end;\n        }\n\n        const sliceLength = end - start;\n\n        for (let i = 0; i < sliceLength; ++i) {\n            const index = i + start;\n            if (index >= len) {\n                break;\n            }\n            res.push(arr[index]);\n        }\n        return res;\n    }\n}\n\nnamespace Math {\n    export function clamp(min: number, max: number, value: number): number {\n        return Math.min(max, Math.max(min, value));\n    }\n\n    /**\n      * Returns the absolute value of a number (the value without regard to whether it is positive or negative).\n      * For example, the absolute value of -5 is the same as the absolute value of 5.\n      * @param x A numeric expression for which the absolute value is needed.\n      */\n    export function abs(x: number): number {\n        return x < 0 ? -x : x;\n    }\n\n    /**\n      * Returns the sign of the x, indicating whether x is positive, negative or zero.\n      * @param x The numeric expression to test\n      */\n    export function sign(x: number): number {\n        if (x == 0) return 0;\n        if (x > 0) return 1;\n        return -1;\n    }\n\n    /**\n      * Returns the larger of two supplied numeric expressions.\n      */\n    export function max(a: number, b: number): number {\n        if (a >= b) return a;\n        return b;\n    }\n\n    /**\n      * Returns the smaller of two supplied numeric expressions.\n      */\n    export function min(a: number, b: number): number {\n        if (a <= b) return a;\n        return b;\n    }\n}\n",
      "pxt.json": "{\n    \"name\": \"core\",\n    \"description\": \"A target sample for PXT\",\n    \"files\": [\n        \"README.md\",\n        \"pxt-core.d.ts\",\n        \"pxt-helpers.ts\",\n        \"enums.d.ts\",\n        \"sims.d.ts\",\n        \"ns.ts\"\n    ],\n    \"testFiles\": [\n        \"test.ts\"\n    ],\n    \"public\": true,\n    \"dependencies\": {}\n}",
      "sims.d.ts": "// Auto-generated from simulator. Do not edit.\ndeclare namespace loops {\n    /**\n     * Repeats the code forever in the background. On each iteration, allows other code to run.\n     * @param body the code to repeat\n     */\n    //% help=functions/forever weight=55 blockGap=8\n    //% blockId=device_forever block=\"forever\"\n    //% shim=loops::forever\n    function forever(body: () => void): void;\n\n    /**\n     * Pause for the specified time in milliseconds\n     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000\n     */\n    //% help=functions/pause weight=54\n    //% block=\"pause (ms) %pause\" blockId=device_pause\n    //% shim=loops::pauseAsync promise\n    function pause(ms: number): void;\n\n}\ndeclare namespace console {\n    /**\n     * Print out message\n     */\n    //%\n    //% shim=console::log\n    function log(msg: string): void;\n\n}\ndeclare namespace colors {\n    /**\n     * Converts red, green, blue channels into a RGB color\n     * @param red value of the red channel between 0 and 255. eg: 255\n     * @param green value of the green channel between 0 and 255. eg: 255\n     * @param blue value of the blue channel between 0 and 255. eg: 255\n     */\n    //% blockId=\"colors_rgb\" block=\"red %red|green %green|blue %blue\"\n    //% red.min=0 red.max=255 green.min=0 green.max=255 blue.min=0 blue.max=255\n    //% advanced=false    \n    //% weight=19\n    //% blockGap=8\n    //% shim=colors::rgb\n    function rgb(red: number, green: number, blue: number): number;\n\n    /**\n     * Get the RGB value of a known color\n     */\n    //% blockId=colors_named block=\"%color\"\n    //% advanced=false    \n    //% weight=20\n    //% blockGap=8\n    //% help=\"colors/named\"\n    //% shim=TD_ID\n    //% shim=colors::named\n    function named(color: Colors): number;\n\n}\ndeclare namespace design {\n    /**\n     * Sets the text  that displays when the marker is detected\n     */\n    //% blockId=ar_set_text block=\"%marker=marker_block|set text %text\" blockGap=8\n    //% weight=98\n    //% blockNamespace=design inBasicCategory=true\n    //% shim=design::setText\n    function setText(marker: number, text: string): void;\n\n    /**\n     * Sets the number that displays when the marker is detected\n     */\n    //% blockId=ar_set_number block=\"%marker=marker_block|set number %number\" blockGap=8\n    //% weight=96\n    //% blockNamespace=design inBasicCategory=true\n    //% shim=design::setNumber\n    function setNumber(marker: number, number: number): void;\n\n    /**\n     * Sets the shape that displays when the marker is detected\n     */\n    //% blockId=ar_set_shape block=\"%marker=marker_block|set shape %shape\" blockGap=8\n    //% weight=100\n    //% shape.fieldEditor=\"gridpicker\"\n    //% shape.fieldOptions.width=\"200\" shape.fieldOptions.columns=\"2\"\n    //% shape.fieldOptions.itemColour=\"black\" shape.fieldOptions.tooltips=\"true\"\n    //% blockNamespace=design inBasicCategory=true\n    //% shim=design::setShape\n    function setShape(marker: number, shape: Shape): void;\n\n    /**\n     * Sets the model that displays when the marker is detected. Takes in a string of the 3D model.\n     */\n    //% blockId=ar_set_model block=\"%marker=marker_block|set model %content\" blockGap=8\n    //% weight=20\n    //% blockNamespace=design inBasicCategory=true\n    //% shim=design::setModel\n    function setModel(marker: number, type: ModelType, content: string): void;\n\n    /**\n     * Sets the color that displays when the marker is detected\n     */\n    //% blockId=ar_set_color block=\"%marker=marker_block|set color %color=colors_named\" blockGap=8\n    //% weight=99\n    //% blockNamespace=design inBasicCategory=true\n    //% shim=design::setColor\n    function setColor(marker: number, color: number): void;\n\n    /**\n     * Sets the opacity of the shape that is displayed on the marker. 0 is invisible, 1 is fully opaque.\n     * @param value How opaque the shape should be between 0 and 1, eg: 0.9\n     */\n    //% blockId=ar_set_opacity block=\"%marker=marker_block|set opacity %value\" blockGap=8\n    //% weight=95\n    //% blockNamespace=design inBasicCategory=true\n    //% shim=design::setOpacity\n    function setOpacity(marker: number, value: number): void;\n\n    /**\n     * Sets the text color that displays when the marker is detected\n     */\n    //% blockId=ar_set_text_color block=\"%marker=marker_block|set text color %color=colors_named\" blockGap=8\n    //% weight=97\n    //% blockNamespace=design inBasicCategory=true\n    //% shim=design::setTextColor\n    function setTextColor(marker: number, color: number): void;\n\n    /**\n     * Sets the size of the 3D object that is rendered. Shapes will automatically have a default scale value of 1.\n     * @param size The amount to scale the model by, eg: 1\n     */\n    //% blockId=ar_set_scale block=\"%marker=marker_block|set scale %number\" blockGap=8\n    //% weight=94\n    //% blockNamespace=design inBasicCategory=true\n    //% inlineInputMode=\"inline\"\n    //% shim=design::setScale\n    function setScale(marker: number, size: number): void;\n\n    /**\n     * Sets the size of the 3D object that is rendered. Shapes will automatically have a default scale value of (1, 1, 1).\n     * @param x The amount to scale the model in the x direction, eg: 1\n     * @param y The amount to scale the model in the y direction, eg: 1\n     * @param z The amount to scale the model in the z direction, eg: 1\n     */\n    //% blockId=ar_set_scale_3d block=\"%marker=marker_block|set scale x: %x|y: %y|z: %z\" blockGap=8\n    //% blockNamespace=design advanced=true\n    //% inlineInputMode=\"inline\"\n    //% shim=design::setScale3D\n    function setScale3D(marker: number, x: number, y: number, z: number): void;\n\n    /**\n     * Sets the position of the 3D object that is rendered in relation to the marker. Shapes will automatically have a default position of (0, 0, 0).\n     */\n    //% blockId=ar_set_position block=\"%marker=marker_block|set position x: %x|y: %y|z: %z\" blockGap=8\n    //% weight=92\n    //% blockNamespace=design inBasicCategory=true\n    //% inlineInputMode=\"inline\"\n    //% shim=design::setPosition\n    function setPosition(marker: number, x: number, y: number, z: number): void;\n\n    /**\n     * Sets the rotation of the 3D object that is rendered in relation to the marker. Shapes will automatically have a default rotation of 0°.\n     */\n    //% blockId=ar_set_rotation block=\"%marker=marker_block|set rotation %degrees|°\" blockGap=8\n    //% weight=93\n    //% blockNamespace=design inBasicCategory=true\n    //% inlineInputMode=\"inline\"\n    //% shim=design::setRotation\n    function setRotation(marker: number, degrees: number): void;\n\n    /**\n     * Sets the rotation of the 3D object that is rendered in relation to the marker. Shapes will automatically have a default rotation of (0, 0, 0).\n     */\n    //% blockId=ar_set_rotation_3d block=\"%marker=marker_block|set rotation x: %x|° y: %y|° z: %z|°\" blockGap=8\n    //% blockNamespace=design advanced=true\n    //% inlineInputMode=\"inline\"\n    //% shim=design::setRotation3D\n    function setRotation3D(marker: number, x: number, y: number, z: number): void;\n\n    /**\n     * Sets the filter of the video feed.\n     */\n    //% blockId=ar_add_filter block=\"add filter %filter\" blockGap=8\n    //% weight=91\n    //% blockNamespace=design inBasicCategory=true\n    //% inlineInputMode=\"inline\"\n    //% shim=design::addFilter\n    function addFilter(filter: Filter): void;\n\n    /**\n     * Sets the filter of the video feed.\n     */\n    //% blockId=ar_remove_filter block=\"remove filter %filter\" blockGap=8\n    //% weight=90\n    //% blockNamespace=design inBasicCategory=true\n    //% inlineInputMode=\"inline\"\n    //% shim=design::removeFilter\n    function removeFilter(filter: Filter): void;\n\n}\ndeclare namespace interaction {\n    /**\n     * Allows use to define callbacks for a marker event\n     * @param marker \n     * @param event \n     */\n    //% blockId=ar_on_event block=\"on %marker=marker_block|%event |do\" blockGap=8\n    //% event.fieldEditor=\"gridpicker\"\n    //% event.fieldOptions.width=\"400\" event.fieldOptions.columns=\"4\"\n    //% event.fieldOptions.tooltips=\"true\"\n    //% weight=99\n    //% shim=interaction::onEvent\n    function onEvent(marker: number, event: MarkerEvent, handler: () => void): void;\n\n    /**\n     * Allows use to define callbacks for a marker event\n     * @param marker\n     * @param event \n     */\n    //% blockId=ar_while_event block=\"while %marker=marker_block|%event |do\" blockGap=8\n    //% event.fieldEditor=\"gridpicker\"\n    //% event.fieldOptions.width=\"400\" event.fieldOptions.columns=\"4\"\n    //% event.fieldOptions.tooltips=\"true\"    \n    //% weight=97\n    //% shim=interaction::whileEvent\n    function whileEvent(marker: number, event: MarkerLoopEvent, handler: () => void): void;\n\n    /**\n     * Allows user to define callbacks that fire while the multi marker event is true\n     * @param marker1 \n     * @param marker2 \n     * @param event \n     */\n    //% blockId=ar_while_multi_event block=\"while %marker1=marker_block|%event |%marker2=marker_block |do\" blockGap=8\n    //% event.fieldEditor=\"gridpicker\"\n    //% event.fieldOptions.width=\"400\" event.fieldOptions.columns=\"4\"\n    //% event.fieldOptions.tooltips=\"true\"\n    //% inlineInputMode=\"inline\"    \n    //% weight=96\n    //% shim=interaction::whileMultiEvent\n    function whileMultiEvent(marker1: number, event: MultiMarkerEvent, marker2: number, handler: () => void): void;\n\n    /**\n     * Allows user to define callbacks that trigger once when the multi marker event is true\n     * @param marker1 \n     * @param marker2 \n     * @param event \n     */\n    //% blockId=ar_on_multi_event block=\"on %marker1=marker_block|%event |%marker2=marker_block |do\" blockGap=8\n    //% event.fieldEditor=\"gridpicker\"\n    //% event.fieldOptions.width=\"400\" event.fieldOptions.columns=\"4\"\n    //% event.fieldOptions.tooltips=\"true\"    \n    //% inlineInputMode=\"inline\"    \n    //% weight=98\n    //% shim=interaction::onMultiEvent\n    function onMultiEvent(marker1: number, event: MultiMarkerEvent, marker2: number, handler: () => void): void;\n\n}\ndeclare namespace markers {\n    /**\n     * Gets the distance between the centers of 2 markers\n     */\n    //% blockId=ar_get_dist block=\"distance from %marker1=marker_block| to %marker2=marker_block\" blockGap=8\n    //% weight=97\n    //% shim=markers::distance\n    function distance(marker1: number, marker2: number): number;\n\n    /**\n     * Gets the x, y, z positional coordinates of a marker\n     */\n    //% blockId=ar_get_pos block=\"%marker=marker_block|position %axis\" blockGap=8\n    //% weight=99\n    //% shim=markers::position\n    function position(marker: number, axis: Axes): number;\n\n    /**\n     * Gets the x, y, z rotational values of a marker\n     */\n    //% blockId=ar_get_rot block=\"%marker=marker_block|rotation %axis\" blockGap=8\n    //% weight=98\n    //% shim=markers::rotation\n    function rotation(marker: number, axis: Axes): number;\n\n    /**\n     * Maps the x, y, or z position of a marker to a specified range.\n     * @param out_min The lower end of the range to map to, eg: 0\n     * @param out_max The upper end of the range to map to, eg: 100\n     */\n    //% blockId=ar_map_pos block=\"%marker=marker_block|map position %axis|from %out_min|to %out_max\" blockGap=8\n    //% weight=96\n    //% inlineInputMode=\"inline\"\n    //% shim=markers::mapPosition\n    function mapPosition(marker: number, axis: Axes, out_min: number, out_max: number): number;\n\n    /**\n     * Maps the x, y, or z position of a marker to a specified range. When you rotate the marker, the lowest value will be when the marker is in it's normal orientation and will get higher as you turn it clockwise.\n     * @param out_min The lower end of the range to map to, eg: 0\n     * @param out_max The upper end of the range to map to, eg: 100\n     */\n    //% blockId=ar_map_rot block=\"%marker=marker_block|map rotation from %out_min|to %out_max\" blockGap=8\n    //% weight=95\n    //% inlineInputMode=\"inline\"\n    //% shim=markers::mapRotation\n    function mapRotation(marker: number, out_min: number, out_max: number): number;\n\n    /**\n     * Maps the value of 1 marker in relation to its distance between 2 markers.\n     */\n    //% blockId=ar_slider block=\"slider %marker1=marker_block|from %marker2=marker_block|to %marker3=marker_block\" blockGap=8\n    //% weight=94\n    //% shim=markers::slider\n    function slider(marker1: number, marker2: number, marker3: number): number;\n\n}\ndeclare namespace messaging {\n    /**\n     * Peer\n     * @param id The value of the marker\n     */\n    //% blockId=peer_block block=\"send key %key| value %value| to %id\"\n    //% blockNamespace=messaging inBasicCategory=true\n    //% weight=100\n    //% shim=messaging::send\n    function send(key: string, value: number, id: string): void;\n\n    /**\n     * Allows user to define callbacks for receive event\n     * @param key \n     */\n    //% blockId=peer_receive block=\"when I receive key %key|do\" blockGap=8\n    //% blockNamespace=messaging inBasicCategory=true\n    //% weight=99\n    //% shim=messaging::receive\n    function receive(key: string, handler: () => void): void;\n\n}\ndeclare namespace paint {\n    /**\n     * Use a marker as an AR paintbrush..\n     */\n    //% blockId=ar_set_brush_mode block=\"%marker=marker_block|set brush %val\" blockGap=8\n    //% blockNamespace=paint inBasicCategory=true\n    //% inlineInputMode=\"inline\"\n    //% shim=paint::setBrushMode\n    function setBrushMode(marker: number, val: Toggle): void;\n\n    /**\n     * Set the color of your AR paintbrush.\n     */\n    //% blockId=ar_set_brush_color block=\"%marker=marker_block|set brush color %color=colors_named\" blockGap=8\n    //% blockNamespace=paint inBasicCategory=true\n    //% inlineInputMode=\"inline\"\n    //% shim=paint::setBrushColor\n    function setBrushColor(marker: number, color: number): void;\n\n    /**\n     * Clear all strokes made by your AR paintbrush.\n     */\n    //% blockId=ar_clear_brush_strokes block=\"%marker=marker_block|clear brush strokes\" blockGap=8\n    //% blockNamespace=paint inBasicCategory=true\n    //% inlineInputMode=\"inline\"\n    //% shim=paint::clearBrushStrokes\n    function clearBrushStrokes(marker: number): void;\n\n}\n\n// Auto-generated. Do not edit. Really.\n",
      "test.ts": ""
    }
  },
  "compile": {
    "isNative": false,
    "hasHex": false,
    "floatingPoint": true
  },
  "versions": {
    "target": "0.0.132",
    "pxt": "2.0.10"
  }
}