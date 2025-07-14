#!/usr/bin/env bash

# ansible-vault create ansible/roles/postgres/vars/vault.yml
# echo "vault_password" > ansible/.vault_pass
export ANSIBLE_VAULT_PASSWORD_FILE=./ansible/.vault_pass

ROOT=$(dirname "$(readlink -f "$0")")
DISTRO=$(lsb_release -c | awk '{print $2}' 2>/dev/null | tr -d ' ')

echo "Running Ansible playbook for $DISTRO"

if [ "$DISTRO" == "void" ] || [ "$DISTRO" == "arch" ]; then
  ANSIBLE_PYTHON_INTERPRETER=auto_silent \
  ANSIBLE_CONFIG="${ROOT}/../ansible/ansible.cfg" \
  ansible-playbook -e "ansible_port=2200" "${ROOT}/../ansible/main.yml" -i tyche,
else
  ANSIBLE_PYTHON_INTERPRETER=auto_silent \
  ANSIBLE_CONFIG="${ROOT}/../ansible/ansible.cfg" \
  ansible-playbook -K --vault-password-file "${ROOT}/../ansible/.vault_pass"  --connection=local -e "ansible_port=2200" "${ROOT}/../ansible/main.yml" -i localhost,
fi