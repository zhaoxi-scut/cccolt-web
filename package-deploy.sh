#!/bin/bash

echo -e "[  0%] \033[34;1mstart deploy to www.cccolt.top\033[0m"
echo -e "[ 25%] \033[32mremove old files...\033[0m"
ssh root@www.cccolt.top 'bash ~/remove-www-website'
echo -e "[ 50%] \033[32mcopy files to website server...\033[0m"
scp -rq docs/.vuepress/dist root@www.cccolt.top:~
echo -e "[ 75%] \033[32mupdate website server...\033[0m"
ssh root@www.cccolt.top 'bash ~/update-www-website'
echo -e "[100%] \033[32mupdate your code to github...\033[0m"
git add .
date "+%Y-%m-%d %H:%M:%S" >> .git-update.log
git commit -m "deploy" >> .git-update.log 2>&1
git push origin master >> .git-update.log 2>&1
echo -e "[100%] \033[32;1mdeploy success\033[0m"