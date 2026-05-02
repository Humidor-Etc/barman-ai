import os

file_path = os.path.join(os.path.dirname(__file__), 'src', 'useStore.js')

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

old = "const API_KEY = 'METS_TA_CLE_ICI'"
new = "const API_KEY = import.meta.env.VITE_ANTHROPIC_KEY"

if old in content:
    content = content.replace(old, new)
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print("✅ Clé API remplacée avec succès!")
else:
    print("⚠️  Placeholder non trouvé — vérifie si la clé est déjà correcte.")
    # Affiche la ligne API_KEY pour diagnostic
    for i, line in enumerate(content.split('\n')):
        if 'API_KEY' in line:
            print(f"   Ligne {i+1}: {line.strip()}")
