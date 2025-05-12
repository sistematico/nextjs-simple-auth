#!/usr/bin/env bash

# ansible-vault create roles/postgres/vars/vault.yml

if [ -f /etc/arch-release ]; then
  ANSIBLE_PYTHON_INTERPRETER=auto_silent \
  ANSIBLE_CONFIG="$HOME/code/agrocomm/ansible/ansible.cfg" \
  ansible-playbook -e "ansible_port=2200" "${HOME}/code/agrocomm/ansible/main.yml" --ask-vault-pass -i tyche,
else
  ANSIBLE_PYTHON_INTERPRETER=auto_silent \
  ANSIBLE_CONFIG=/var/www/agrocomm/ansible/ansible.cfg \
  ansible-playbook --connection=local -e "ansible_port=2200" /var/www/agrocomm/ansible/main.yml --ask-vault-pass -i localhost,
fi