# 常用 MCP 服务器 (4个)

## chrome-devtools-mcp
  claude mcp add chrome-devtools -s user -- npx chrome-devtools-mcp@latest

## playwright  
  claude mcp add playwright -s user -- npx @playwright/mcp@latest 

## context7  
  claude mcp add context7 -s user -- npx @upstash/context7-mcp 

## github
  claude mcp add --transport http github https://api.githubcopilot.com/mcp -H "Authorization: Bearer $env:GITHUB_PAT" -s user

   