@echo off
set "MAVEN_BIN=%~dp0.mvn\apache-maven-3.9.6\bin\mvn.cmd"
if exist "%MAVEN_BIN%" (
    "%MAVEN_BIN%" %*
) else (
    mvn %*
)
