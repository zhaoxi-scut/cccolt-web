#!/bin/bash

set -euo pipefail

log_success() {
    printf '\033[32;1m✓\033[0m %s\n' "$1"
}

log_error() {
    printf '\033[31;1m✗\033[0m %s\n' "$1" >&2
}

start_step() {
    current_step="$1"
    printf '  %s...\n' "$current_step"
}

# 先解析完整部署流程，避免等待 SSH 时编辑脚本影响后续命令读取。
main() {
    cd -- "$(dirname -- "${BASH_SOURCE[0]}")"

    if ! command -v python3 >/dev/null 2>&1; then
        log_error '缩进交互式输出需要 python3，请先安装'
        exit 1
    fi

    if ! command -v zip >/dev/null 2>&1; then
        log_error '打包部署文件需要 zip，请先安装'
        exit 1
    fi

    run_indented() {
        python3 scripts/deploy-output.py "$@"
    }

    if [[ ! -d docs/.vuepress/dist ]]; then
        log_error "未找到构建产物，请先运行 npm run docs:build"
        exit 1
    fi

    deploy_host='root@www.cccolt.top'
    ssh_control_dir=$(mktemp -d /tmp/cccolt-deploy.XXXXXXXX)
    ssh_control_path="$ssh_control_dir/control"
    archive_path="$ssh_control_dir/dist.zip"
    remote_archive=".${ssh_control_dir##*/}.zip"
    remote_archive_created=false

    ssh_options=(
        -o ConnectTimeout=15
        -o ServerAliveInterval=15
        -o ServerAliveCountMax=3
        -o ControlMaster=auto
        -o ControlPersist=60
        -o "ControlPath=$ssh_control_path"
    )

    cleanup() {
        if [[ -S "$ssh_control_path" ]]; then
            if [[ "$remote_archive_created" == true ]]; then
                ssh "${ssh_options[@]}" -o BatchMode=yes "$deploy_host" \
                    "rm -f -- \"\$HOME/$remote_archive\"" >/dev/null 2>&1 || true
            fi
            ssh "${ssh_options[@]}" -O exit "$deploy_host" >/dev/null 2>&1 || true
        fi
        rm -rf -- "$ssh_control_dir"
    }
    trap cleanup EXIT
    current_step='start deployment'
    trap 'log_error "$current_step failed，请检查上方输出和 .git-update.log"' ERR

    printf '\033[34;1mstart to deploy dist/* to www.cccolt.top\033[0m\n'
    start_step 'pack website files into zip'
    (
        cd docs/.vuepress
        zip -qr "$archive_path" dist
    )
    log_success "$current_step"
    start_step 'check website server'
    run_indented ssh "${ssh_options[@]}" "$deploy_host" \
        'command -v unzip >/dev/null || { echo "服务器需要先安装 unzip" >&2; exit 127; }; test -f ~/remove-www-website && test -f ~/update-www-website'
    log_success "$current_step"
    start_step 'upload website zip'
    remote_archive_created=true
    run_indented scp "${ssh_options[@]}" "$archive_path" "${deploy_host}:${remote_archive}"
    log_success "$current_step"
    start_step 'verify uploaded zip'
    run_indented ssh "${ssh_options[@]}" "$deploy_host" \
        "unzip -tqq \"\$HOME/$remote_archive\""
    log_success "$current_step"
    start_step 'remove old files'
    run_indented ssh "${ssh_options[@]}" "$deploy_host" 'bash ~/remove-www-website'
    log_success "$current_step"
    start_step 'extract website zip'
    run_indented ssh "${ssh_options[@]}" "$deploy_host" \
        "unzip -oq \"\$HOME/$remote_archive\" -d \"\$HOME\" && rm -f -- \"\$HOME/$remote_archive\""
    remote_archive_created=false
    log_success "$current_step"
    start_step 'update website server'
    run_indented ssh "${ssh_options[@]}" "$deploy_host" 'bash ~/update-www-website'
    log_success "$current_step"
    start_step 'update your code to github'
    git add .
    date "+%Y-%m-%d %H:%M:%S" >> .git-update.log
    if ! git diff --cached --quiet; then
        git commit -m "deploy" >> .git-update.log 2>&1
    fi
    git push origin master >> .git-update.log 2>&1
    log_success "$current_step"
    log_success 'deploy successfully'
}

main "$@"
