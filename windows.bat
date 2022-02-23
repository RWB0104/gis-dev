@echo off

if exist .\docs\ (
	rmdir /s /q .\docs
)

move .\build .\docs