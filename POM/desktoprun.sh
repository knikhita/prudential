#!/bin/bash
REPO="PrudentialTests"
BRANCH="master"

URL="https://openweathermap.org/"

PR=''

if [ "$repo" != "" ]; then
	REPO=$repo
fi

if [ "$branch" != "" ]; then
	BRANCH=$branch
fi

if [ "$pr" != "" ]; then
	PR=$pr
fi

if [ "$url" != "" ]; then
	URL=$url
fi

echo "installing dependencies..."
npm install

echo "starting test for branch [$REPO] [$BRANCH] at [$URL]"

REPO=$REPO BRANCH=$BRANCH PR=$PR URL=$URL npm run test-desktop
