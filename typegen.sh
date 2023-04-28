#!/bin/bash

( cd backend && npm run gen:types )
ls backend
ls
if [ -f ./backend/schema.ts ]; then
	if [[ $(sha1sum ./backend/schema.ts) = $(sha1sum ./frontend/src/generated/schema.ts) ]]; then
		echo "No changes in generated types"
		exit 0
	fi
else
	echo Type generation did not produce expected output
	exit 1
fi
echo Filehash mismatch, copying file

cp backend/schema.ts frontend/src/generated
