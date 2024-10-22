from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# Configuração do WebDriver
driver = webdriver.Chrome(executable_path='C:\Users\User\Downloads\chrome-win64\chrome-win64\chrome.exe')
driver.get('https://web.whatsapp.com')

# Esperar o usuário fazer login no WhatsApp Web
input("Pressione Enter após fazer login no WhatsApp Web...")

# Navegar na lista de chats e abrir cada chat para coletar o número/nome
contacts_data = []

# Extração de contatos
chats = driver.find_elements(By.CLASS_NAME, '_2aBzC')  # Este seletor pode variar
for chat in chats:
    chat.click()
    time.sleep(2)
    
    try:
        # Tentar encontrar o nome ou número de contato na conversa
        contact_name = driver.find_element(By.CLASS_NAME, '_21S-L').text
        contacts_data.append(contact_name)
    except Exception as e:
        print(f"Erro ao extrair: {e}")

# Salvar contatos em um arquivo
with open("contatos_extrados.txt", "w", encoding="utf-8") as file:
    for contact in contacts_data:
        file.write(contact + "\n")

driver.quit()
